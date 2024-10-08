export const config = {
    g_hero_bkg_url: "/hero_bkg.webp",
    g_404icon_url: "/404icon.webp",

    g_favicon_url: "https://avatars.githubusercontent.com/u/117056212?v=4",
    g_avatar_url: "https://avatars.githubusercontent.com/u/117056212?v=4",

    g_github_icon_url:
        "https://github.githubassets.com/favicons/favicon-dark.svg",

    g_blogs_dir: "/blogs/",
    g_blogs_groups_file: "groups.json",
    g_group_config_file: "config.json",

    g_nav_items: [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "Intro",
            url: "/Intro",
        },
        {
            name: "Blogs",
            url: "/allgroups",
        },
    ],

    g_fetch_options: {
        //避免缓存影响页面加载的fetch配置
        method: "GET",
        cache: "no-store",
    },
};
