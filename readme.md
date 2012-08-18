# [MVR.ME](http://mvr.me/)

mvr.me is my selfwritten mini blog like archive. It has a mini MVC structure written in PHP.

Content gets added by either the [backend](https://github.com/askmike/mvr.me/blob/master/core/controllers/adminController.php) or by the [node script](https://github.com/askmike/mvr.me/blob/master/core/js/fetchTwitter.js) that watches my twitter stream for all tweets with `#mvr`. The node script runs like a deamon using Forever.

It's written on top of H5BP and gets deployed via this git repo.