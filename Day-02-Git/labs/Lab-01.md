# بسم الله الرحمن الرحيم

[TOC]

## Task: Build our own Grocery List

### Lab Steps

- Ensure that Git is installed on your system

`$ git`

- Create an empty direcotyr named `ITI` on your Desktop
- In this directory, try the following command

`$ git status`

- Initialize an empty Git Repository

`$ git init`

- Create `.gitignore` file inside your directory. Add the follwing line and save the file

`*.md`

- Create some md files and other files
- Try different Git commands, like
`$ git add `
`$ git add .`
`$ git status`

- Time to commit
  - Add the commit message
  `$ git commit -m 'MESSAGE'`
  - Commit Changes
  `$ git commit`

- Display History
  - `$ git log`

- Show last commit
  - `$ git show`
  - `$ git show --stat`

- Branches
  - List local branches
    - `$ git branch -l`
  - List remote branches
    - `$ git branch -r`
  - Create Branch
    - `$ git checkout -b NEWBRANCH`
    - `.git/refs/heads/ <branch>`
  - Switching Branches
    - `$ git checkout BRANCHNAME`
 
- Merging Branches
To merge branch NEWBRANCH into Master branch
  - Checkout Master branch
  - `$ git merge NEWBRANCH`
  - `$ git branch -d NEWBRANCH` # delete branch

- Tags
  - `$ git tag -l`
  - `.git/refs/tags/ <tag>`
  - `$ git tag TAGNAME` # For current commit
  - `$ git tag -e TAGNAME COMMITHASH `

- Notes

  - `$ git checkout branchname` # puts head into latest commit
