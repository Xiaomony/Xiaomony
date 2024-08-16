import { config } from "@/config";
const groups_info_file = config.g_blogs_dir + config.g_blogs_groups_file;

export async function loadgroups() {
    let group_list = {};
    try {
        const resp = await fetch(groups_info_file);
        group_list = await resp.json();
    } catch (error) {
        console.log("read blog groups failed...\n\n" + error);
    } finally {
        return group_list;
    }
}

// export async function scanblogs() {
//     let group_list = {};
//     let blog_list = {};
//     try {
//         const resp = await fetch(g_blog_group_file);
//         const data = await resp.json();

//         for (const group of data) {
//             group_list[group["group_name"]] = {
//                 blogs: group["blogs"],
//             };
//             for (const blog of group["blogs"]) {
//                 if (blog in blog_list) return;
//                 let path = g_blog_dir + blog;
//                 blog_list[blog] = await scan_each_blog_dir(path);
//             }
//         }
//     } catch (error) {
//         console.log("read blog groups failed...\n\n" + error);
//     } finally {
//         return [group_list, blog_list];
//     }
// }

// async function scan_each_blog_dir(path) {
//     try {
//         const resp = await fetch(path + "/config.json");
//         if (!resp.ok)
//             throw new Error(`Blog ID error: '${path}' do not exists!`);
//         const data = await resp.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }
