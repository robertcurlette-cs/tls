'use client'

import { useTranslation } from '@/app/i18n/client';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const PasswordChecklist = dynamic(() => import('react-password-checklist'), {
    ssr: false,
});

interface IRegistrationForm {
    error: string;
    clicked: boolean;
    handleRegistration: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function RegistrationForm({
    error,
    clicked,
    handleRegistration,
}: IRegistrationForm): JSX.Element {
    const [password, setPassword] = useState<string>("");
    const [passwordAgain, setPasswordAgain] = useState<string>("");
    const [passwordMatched, setPasswordMatched] = useState<boolean>(false);
    const { t } = useTranslation(getCookie("locale") || "", "profile", {})

    return (
        <div className="w-full md:mt-0 sm:max-w-2xl xl:p-0">
            <div className="mt-5">

                <form className="space-y-4 md:space-y-6" onSubmit={handleRegistration}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {t('label.name')}
                        </label>
                        <input type="text" name="full_name" id="full_name" placeholder={t('placeholder.name')} required={true} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {t('label.email')}
                        </label>
                        <input type="email" name="email" id="email" placeholder={t('placeholder.email')} required={true} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {t('label.password')}
                        </label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} placeholder={t('placeholder.password')} required={true} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {t('label.confirmPassword')}
                        </label>
                        <input type="password" name="confirm_password" id="confirm_password" onChange={e => setPasswordAgain(e.target.value)} placeholder={t('placeholder.confirmPassword')} required={true} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {password &&
                        <PasswordChecklist
                            rules={["minLength", "number", "capital", "match"]}
                            minLength={8}
                            value={password}
                            valueAgain={passwordAgain}
                            onChange={(isValid) => { setPasswordMatched(isValid) }}

                            messages={{
                                minLength: t('password.minlength'),
                                specialChar: t('password.specialChar'),
                                number: t('password.number'),
                                capital: t('password.capital'),
                                match: t('password.match'),
                            }}
                        />
                    }

                    {!!error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" disabled={!passwordMatched || clicked} className={!passwordMatched
                        ? "w-full h-12 text-white bg-primary-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-400"
                        : "w-full h-12 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}>
                        {clicked && (
                            <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                            </svg>
                        )}

                        {t('button.register')}
                    </button>
                </form>
            </div>
        </div>
    )
}
