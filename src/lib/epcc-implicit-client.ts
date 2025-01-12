import {
  gateway as EPCCGateway,
  MemoryStorageFactory,
  StorageFactory,
} from "@moltin/sdk";
import { epccEnv } from "./resolve-epcc-env";
import { resolveEpccCustomRuleHeaders } from "./custom-rule-headers";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { _getClientStore, _registerClient } from "./ep-client-store";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { EP_CURRENCY_CODE } from "./resolve-ep-currency-code";

const headers = resolveEpccCustomRuleHeaders();

const { client_id, host } = epccEnv;

export const getEpccImplicitClient = <
  P extends ParsedUrlQuery = ParsedUrlQuery
>(
  context?: GetServerSidePropsContext<P>
) => {
  const implicitClient = _getClientStore("implicit");

  /**
   * TODO There is a danger here if state persists between serverless functions then it's possible the
   *  implicitClient will be defined with the previous request context.
   */
  if (implicitClient) {
    return implicitClient;
  }
  /**
   * Static rendering has no access to a request context e.g. cookies
   * Using in memory storage for static builds
   */
  const isSSG = !context && typeof window === "undefined";
  const gateway = EPCCGateway({
    name: process.env.NEXT_PUBLIC_COOKIE_PREFIX_KEY,
    client_id,
    host,
    currency: EP_CURRENCY_CODE,
    ...(headers ? { headers } : {}),
    storage: isSSG
      ? new MemoryStorageFactory()
      : createNextCookieStorageFactory(context),
  })
  return _registerClient(
    gateway,
    "implicit"
  );
};

function createNextCookieStorageFactory<
  P extends ParsedUrlQuery = ParsedUrlQuery
>(context?: GetServerSidePropsContext<P>): StorageFactory {
  return {
    set: (key: string, value: string): void => {
      setCookie(key, value, {
        ...(context && { req: context.req, res: context.res }),
        sameSite: "strict",
        encode: (val: string) => val,
      });
    },
    get: (key: string): any => {
      return getCookie(key, context && { req: context.req, res: context.res });
    },
    delete: (key: string) => {
      deleteCookie(key, context && { req: context.req, res: context.res });
    },
  };
}
