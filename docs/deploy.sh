# https://blog.csdn.net/doubleface999/article/details/105154595
# 启动nginx
systemctl start nginx.service
# 开机启动nginx
systemctl enable nginx.service
# 重启nginx
systemctl restart nginx.service
# 测试配置是否正确
nginx -t
# 配置文件：/etc/nginx/nginx.conf
# 重启nginx
nginx -s reload

# 上传文件 scp -r 本地目录 root@服务器ip:服务器静态资源目录
scp -r ./dist.zip root@39.100.82.255:/home/docs
# 解压文件 yum install -y unzip zip
unzip -o -d /home/docs dist.zip # -o 不提示覆盖文件 -d 指明解压到哪个目录
# 打包文件

# 文件重命名
mv A B # 将目录A重命名为B
mv /a /b/c # 将/a目录移动到/b下，并重命名为c
