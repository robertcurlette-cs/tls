"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "./Feature";
import Grid from "./Grid";
import Page from "./Page";
import Menu from "./Menu";
import MenuLink from "./MenuLink";
import Teaser from "./Teaser";
import HeroBanner from "./HeroBanner";
import HeroCarousel from "./HeroCarousel";
import Announcement from "./Announcement";
import HeaderLogo from "./HeaderLogo";

const components = {
    feature: Feature,
    grid: Grid,
    teaser: Teaser,
    page: Page,
    mega_menu: Menu,
    menu_link: MenuLink,
    hero_banner: HeroBanner,
    hero_carousel: HeroCarousel,
    announcement: Announcement,
    logo: HeaderLogo,
};

storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_KEY,
    use: [apiPlugin],
    components,
    apiOptions: {
        region: ''
    }
});

export default function StoryblokProvider({ children }: any) {
    return children;
}
