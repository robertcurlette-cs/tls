
export const getHomePageContent = async (locale?: string) => {
    const headerResponse = await fetch(`https://api-us.storyblok.com/v2/cdn/stories/home?token=${process.env.NEXT_PUBLIC_STORYBLOK_API_KEY}&version=published&language=${locale}`, { next: { revalidate: 10 } });
    return await headerResponse.json();
}

export const getTopNavigationContent = async (locale?: string, catalog?: string) => {
    const headerResponse = await fetch(`https://api-us.storyblok.com/v2/cdn/stories/navigation/${catalog}/menu?token=${process.env.NEXT_PUBLIC_STORYBLOK_API_KEY}&version=published&language=${locale}`, { next: { revalidate: 10 } });
    return await headerResponse.json();
}

export const getCategoryContent = async (categories: string[]) => {
    const headerResponse = await fetch(`https://api-us.storyblok.com/v2/cdn/stories/categories/${categories.join("/")}?token=${process.env.NEXT_PUBLIC_STORYBLOK_API_KEY}&version=published`, { next: { revalidate: 10 } });
    return await headerResponse.json();
}

export const getContentByFolder = async (type: string, page: string[]) => {
    const headerResponse = await fetch(`https://api-us.storyblok.com/v2/cdn/stories/${type}/${page.join("/")}?token=${process.env.NEXT_PUBLIC_STORYBLOK_API_KEY}&version=published`, { next: { revalidate: 10 } });
    return await headerResponse.json();
}

export const getLogo = async (locale?: string) => {
    const headerResponse = await fetch(`https://api-us.storyblok.com/v2/cdn/stories/logo?token=${process.env.NEXT_PUBLIC_STORYBLOK_API_KEY}&version=published&language=${locale}`, { next: { revalidate: 10 } });
    return await headerResponse.json();
}
