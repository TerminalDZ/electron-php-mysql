@echo off
cd /d %~dp0bin
start mysqladmin --defaults-file=..\my.ini --port=3311 --user=root --password=root shutdown
