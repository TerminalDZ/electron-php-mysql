@echo off
cd /d %~dp0bin
start mysqld_z --defaults-file=..\my.ini --console

