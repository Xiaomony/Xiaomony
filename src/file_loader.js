import { config } from "@/config";

let group_list = null;
export async function findblog_byIds(groupId, blogId) {
    const [group, blog_list] = await getblogs_byGroupID(groupId); //group_list.findIndex(item => item.id == groupId);
    if (group == null) return [null, null];
    const bdex = blog_list.findIndex(item => item.id == blogId);
    if (bdex == -1) {
        return [null, null];
    }
    const blog_entrance_path =
        config.g_blogs_dir + group.path + blog_list[bdex].path;
    return [blog_entrance_path, blog_list[bdex]];
}

export async function getgroups() {
    if (group_list === null) {
        await loadgroups();
    }
    return group_list;
}
export async function getblogs_byGroupID(id) {
    const groups = await getgroups();
    const index = groups.findIndex(item => {
        return item.id == id;
    });
    if (index <= -1) {
        return [null, null];
    }
    if (group_list[index].blog_list === undefined) {
        group_list[index].blog_list = await load_blogs_in_group(
            group_list[index].path
        );
    }
    return [groups[index], group_list[index].blog_list];
}

export async function loadgroups() {
    const groups_info_file = config.g_blogs_dir + config.g_blogs_groups_file;
    group_list = {};
    try {
        const resp = await fetch(groups_info_file, config.g_fetch_options);
        group_list = await resp.json();
    } catch (error) {
        console.log("read blog groups failed...\n\n" + error);
    }
}

export async function load_blogs_in_group(group_path) {
    const group_config_path =
        config.g_blogs_dir + group_path + config.g_group_config_file;
    let blog_list = {};
    try {
        const resp = await fetch(group_config_path, config.g_fetch_options);
        blog_list = await resp.json();
    } catch (error) {
        console.log(
            `read group config file failed...[group: "${group_path}"]\n\n${error}`
        );
    } finally {
        return blog_list;
    }
}
