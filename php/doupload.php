<?php
    //var_dump($_FILES);
    /*'filename' => 
    array (size=5)
      'name' => string '7730-15042G60S6-52.jpg' (length=22)
      'type' => string 'image/jpeg' (length=10)
      'tmp_name' => string 'D:\wamp64\tmp\phpE94A.tmp' (length=25)
      'error' => int 0
      'size' => int 338411*/
    //获取文件信息
    $fileinfo=$_FILES['filename'];
    //文件上传路径
    $path="./uploads/";
    //大小 0不限止
    $maxsize=0;
    
    //判断错误号
    if($fileinfo['error']>0){
        switch($fileinfo['error']){
            case 1:$error="上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值";break;
            case 2:$error="上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值";break;
            case 3:$error="文件只有部分被上传。";break;
            case 4:$error="没有文件被上传。";break;
            case 6:$error="找不到临时文件夹";break;
            case 7:$error="文件写入失败";break;
            default:$error="未知错误，请稍后再试...";
        }
    }
    //定义允许类型
    $typearr=array("image/jpeg","image/png","image/gif");
    //判断类型
    if(count($typearr)>0){
        if(!in_array($fileinfo['type'],$typearr)){
            die("文件上传失败！类型不符");
        }
    }
    //取后缀
    $ext=pathinfo($fileinfo['name'],PATHINFO_EXTENSION);
    
    //生成随机文件名
    do{
    
        $newname=date("YmdHis").rand(1000,9999).".".$ext;
    
    }while(file_exists($path.$newname));
    
    //判断是否上传成功
    if(is_uploaded_file($fileinfo['tmp_name'])){
        if(move_uploaded_file($fileinfo['tmp_name'],$path.$newname)){
            echo "上传成功！";
        }else{
            die("移动失败！");
        }
    
    }else{
        die("未知错误！请重试");
    
    }
    
?>