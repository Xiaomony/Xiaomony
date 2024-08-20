import json
import os
from pathlib import Path
from datetime import datetime
import shutil
import subprocess
from time import sleep
import webbrowser

default_workspace = Path("./workspace")
default_entrance = "main.md"
default_preview_url = "http://localhost:5173/#/blog/"

blog_dir = Path("./public/blogs")
groups_info = Path("groups.json")
blogs_info = Path("config.json")


def confirm(msg):
    result = input(f"{msg} (y/n):").lower()
    return (result=="y" or result=="yes")


def copy_folder_contents(src_folder, dest_folder):
    # 确保目标文件夹存在
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)
    
    # 获取源文件夹中的所有文件和子文件夹
    for item in os.listdir(src_folder):
        src_path = os.path.join(src_folder, item)
        dest_path = os.path.join(dest_folder, item)
        
        # 如果是文件则复制文件
        if os.path.isfile(src_path):
            shutil.copy2(src_path, dest_path)
        # 如果是目录则递归复制
        elif os.path.isdir(src_path):
            shutil.copytree(src_path, dest_path, dirs_exist_ok=True)


def add_new_group(id):
    new_group_name = input("新的组名:")
    new_group_description = input("组的描述:")
    new_group_path = "group_" + new_group_name.replace(' ', '_') + '/'
    if not os.path.exists(blog_dir / new_group_path):
        os.mkdir(blog_dir / new_group_path)
        with open(blog_dir / new_group_path / blogs_info, "w") as f:
            f.write("[]")

    return {
        "group_name": new_group_name,
        "description": new_group_description,
        "id": id,
        "path": new_group_path,
    }


def add_new_blog(id, group_path):
    global new_blog_title
    new_blog_title = input("blog标题:")
    new_blog_description = input("blog描述:")
    dst_dir = blog_dir/group_path/new_blog_title
    if not os.path.exists(dst_dir):
        os.mkdir(dst_dir)
        copy_folder_contents(default_workspace, dst_dir)

    return {
        "blog_title": new_blog_title,
        "description": new_blog_description,
        "update_time": datetime.now().strftime("%Y-%m-%d  %H:%M:%S"),
        "path": new_blog_title+'/'+default_entrance,
        "id": id
    }


def blog_opr():
    group_id = None
    blog_id = None
    group_path = None
    with open(blog_dir / groups_info, "r+", encoding="utf-8") as groupsjson:
        groups_data = json.load(groupsjson)
        print("--------------groups--------------")
        for (index, item) in enumerate(groups_data):
            print(f"[{index+1}]  (id:{item["id"]})  {item["group_name"]}")
        print("----------------------------------")
        try :
            add_to_index = int(input("输入要添加的组的index（回车以新建一个组）:"))
            group_path = groups_data[add_to_index-1]["path"]
            group_id = groups_data[add_to_index-1]["id"]
        except (ValueError, IndexError):
            new_group_info = add_new_group(len(groups_data)+1)
            group_path = new_group_info["path"]
            groups_data.append(new_group_info)
            group_id = len(groups_data)+1

            groupsjson.truncate(0)
            groupsjson.seek(0, 0)
            json.dump(groups_data, groupsjson, indent=4, ensure_ascii=False)
            
    with open(blog_dir / group_path / blogs_info, "r+", encoding="utf-8") as blogsjson:
        blogs_data = json.load(blogsjson)
        blog_id = len(blogs_data)+1
        blogs_data.append(add_new_blog(len(blogs_data)+1, group_path))

        blogsjson.truncate(0)
        blogsjson.seek(0, 0)
        json.dump(blogs_data, blogsjson, indent=4, ensure_ascii=False)
    
    return f"{group_id}_{blog_id}"


def main():
    id_string = blog_opr()

    if confirm("是否预览(将运行npm run dev)?"):
        print("starting npm")
        process = subprocess.Popen("npm run dev", shell=True, stdout=None, stderr=None)
        webbrowser.open(default_preview_url+id_string)
        sleep(1.5)
        input("回车以终止预览...\n")
        subprocess.run(f"taskkill /F /PID {process.pid} /T", shell=True)

    git_command = f"git commit -m \"add blog id:{id_string}  title:{new_blog_title.replace('\"', "\\\"")}\"" 
    if confirm(f"是否执行git提交(将运行{git_command})?"):
        subprocess.run(f"git add * & {git_command}", shell=True, stdout=None, stderr=None)
        
        if confirm("是否推送到remote(将运行git push)?"):
            subprocess.run("git push", shell=True, stdout=None, stderr=None)


if __name__ == "__main__" :
    main()
