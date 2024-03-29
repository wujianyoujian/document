### 安装

* 直接在git的官网上用安装包进行安装

* 安装之后添加用户

  > `git config --global user.name "Your Name"`
  
  > `git config --global user.email "email@example.com"` 

* 生成公匙
  > `ssh-keygen -t rsa -C "<name>"`
  > 一直回车即可
  > 复制公匙到GitHub上
  > `cat /root/.ssh/id_rsa.pub`

* 查看当前全局的设置
  > `git config --global  --list`

### 基础使用

* 显示隐藏文件

  > `ls -ah`

* 初始化仓库

  > `git init`

* 将文件添加到git仓库

  1. `git add <filename>` or `git add .`
  2. `git commit -m 'message'`

* 查看git仓库的改变

  > `git status` 查看仓库工作区大的状态
  >
  > `git diff <filename>` 查看文件的详细变化

### 版本回退

* 工作区，暂存区，分支master

* 每一次提交记录都会保存, 每一次提交会自动组成一条时间线，如下图所示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628091949414.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxNzEzNzIx,size_16,color_FFFFFF,t_70)

* 查看每次提交的记录

  > `git log` 
  >
  > `git log --pertty=oneline`简洁输出只一行

* 回退版本

  > `git reset --hard HEAD~<n>` or `git reset --hard <commit_id>` 
  > n表示回退到上n层的版本, commit_id 为每次提交的版本好
  >
  > **注意**回退之后不会出现回退之前的版本记录了， 就可以使用
  >
  > `git reflog` 来查看所有的记录

#### 撤销修改

1. 在工作区做了修改，没有提交

   > 使用命令`git checkout -- <filename>` 会回退到最近一次`git commit`的状态
   >
   >  or `git restore <filename>`

2. 已经修改和提交

   > 撤销暂存区的提交，回退到工作区
   >
   > `git restore --staged <filename>`
   >
   > or `git reset HEAD <filename>`

3. 已经修改文件提交暂存区再提交到了版本库

   > 使用版本回退

### 远程仓库

#### 关联远程仓库

1. 本地有仓库，关联远程空白仓库

   > `git remote add <origin_name> <git_name>`
   >
   > origin_name 为远程仓库名，git_name 为仓库地址
   
2.  本地仓库推送到远程仓库, 第一次推送使用

    `git push -u origin master` 

    > 之后推送使用`git push origin master`即可

### 分支

* 创建一个分支

  > `git branch <branch_name>`

* 查看所有分支

  > `git branch`

* 切换分支

  > `git checkout <branch_name>` or `git switch <branch_name>`

* 创建并切换分支

  > `git checkout -b <branch_name>` or `git switch -c <branch_name>`

* 合并分支

  > Fast-forward模式
  >
  > `git merge <branch_name>`
  >
  > 将指定分支合并到当前分支下
  >
  > 速度快，是将master指向dev分支

* 删除分支

  > `git branch -d <branch_name>`

#### 合并分支发生冲突

* 当创建一个分支，创建修改了内容，提交。在切换到主分支，在主分支上也修改了内容，提交。使用合并命令就会发生冲突。如下图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628091935451.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxNzEzNzIx,size_16,color_FFFFFF,t_70)

* 使用`git status`查看是哪个文件，使用`vim <filename>`打开文件  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020062809192130.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxNzEzNzIx,size_16,color_FFFFFF,t_70)

可以看到，两个分支的冲突在哪，修改某一分支的内容，再提交

* 查看提交记录合并图

  > `git log --graph --pretty=oneline --abbrev-commit`
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628091857985.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxNzEzNzIx,size_16,color_FFFFFF,t_70)
* 禁用`fast-forword`合并分支
  > `git merge --no-ff -m "merge no-ff" dev`
  > 并且合并后进行提交

#### bug分支

1. 当出现bug时候，从主分支创建一个bug分支，来修复bug，命名为`issue-101`, 切换当前分支。
2. 修复bug并提交，再切换到master分支上，对`issue-101`进行合并删除，使用禁用`fast-forwrad`模式并提交
3. `dev`分支上也有bug，是不是也需要再进行同样的操作呢，并不需要，只需要切换到`dev`分支上，执行`git cherry-pick <commit_id>`, 复制一个特定的提交到当前分支

#### 保存工作区的修改

1. 有时候工作区的修改没有完成也无法提交，但是你立即需要修改bug，那就需要将工作区的修改保存下来了，使用命令`git stash`, 会保存当前分支的修改
2. 使用`git stash list`查看在当前分支下保存的列表
3. 使用`git stash pop` 会恢复最顶层的保存的修改，就像栈一样。这个命令是回复并删除 or `git stash aplly` 恢复，`git stash drop`删除，使用`git stash aplly stash@{<id>}` 因为可以多次保存，所以可以指定恢复保存的修改

#### 没有合并分支，直接删除分支

* `git branch -D <branch_name>`

#### 多人合作

1. 现在本地推送了dev分支，没有建立联系，远程库有master，dev分支  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628092057211.png)
    
2. 在另外一个文件夹clone这个远程库, 使用`git branch`查看当前分支，发现只有master分支，因此使用

    > `git checkout -b dev origin/dev`从远程库的dev创建本地的dev分支，会自动建立联系

3. 在dev分支上进行修改，提交，推送, `git push origin dev`

4. 在原来的本地仓库下，在dev分支下进行修改提交，再推送，发现出现错误
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628092113359.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxNzEzNzIx,size_16,color_FFFFFF,t_70)

5. 发现有冲突，因此需要先抓取远程分支，`git pull`
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628092135967.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxNzEzNzIx,size_16,color_FFFFFF,t_70)
    提示当前分支没有跟踪信息，就是没有与远程分支建立联系，无法拉取并合并，根据提示使用

    > `git branch --set-upstream-to=origin/dev dev` 

    再进行`git pull`, 发现当前合并有冲突，因此需要修改冲突，提交，再进行推送
    
    
### 标签

* 在git中使用标签，每一个tag就代表了一个commit，这样不需要每次都是使用commit_id

* 创建标签

  > `git tag <tag_name>` 在当前分支下创建标签
  >
  > `git tag -a <tag_name> -m <info> <commmit_id>` 创建标签，-a 标签名，-m 信息，<commit_id> 指定提交的版本

* 查看当前分支

  > `git tag`

* 删除分支

  > `git tag -d <tag_name>`

#### 远程标签
* 推送分支

  > `git push origin <tag_name>`

* 推送所有分支

  > `git push origin --tags`

* 删除远程分支

  1. 先删除本地分支，`git tag -d <tag_name>`

  2. 再删除远程分支, `git push origin :refs/origin/<tag_name>`

### 参考网站

[廖雪峰的git教程](https://www.liaoxuefeng.com/wiki/896043488029600)

### 注意

!> 之前添加了`SSH`密码导致每一次提交远程的时候，都要输入密码

?> 解决方法就是将密码设置为空

1. 输入`ssh-keygen -p`  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628092203900.png)
  
2. 输入你原来的密码

3. 输入新密码，按下`enter`, 再次输入再按下`enter`, 解决了问题
[在这里插入图片描述](https://img-blog.csdnimg.cn/20200628091812767.png)

!> 如果本地仓库不是通过远程仓库克隆下来的, 在提交本地仓库到远程时, 就会发生问题, 因为仓库的提交记录不一样.这就识别成了两个仓库  

?> 和并仓库的提交历史 `git pull origin master --allow-unrelated-histories`

!> 有时候出现仓库并不存在的情况, 可能是因为远程仓库的地址变了,只需要改变本地关联的地址就可以了  

?> `git remote set-url origin <repo_url>`

!> push了, 代码没有生效, 发现是git没有跟踪文件大小写的变化. 因此需要开启大小写

?> `git config core.ignorecase` 默认是`true`  
`git config core.ignorecase false`

!> 总是`pull`或者`push`不上去, `Open SSL` 连接失败等问题

?> `git config --global http.sslVerify "false"`

!> 本地合并有很多冲突，不想合并了

?> `git merge --abort`

!> 本地拉取远程分支有冲突，不想拉取了，回到拉取之前的状态

?> 后悔药 
1. 查看记录 `git reflog`
2. 找到未拉取之前的提交记录 
3. `git reset --hard <commit_id>`

!> 本地有更改，提交了。想用远程的分支覆盖本地的，其他操作太麻烦了。

?> 拉取远程不合并，本地reset到远程分支 
1. `git fetch -all`
2. `git reset --hard origin/master`