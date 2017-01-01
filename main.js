window.fbAsyncInit = function() {
  FB.init({
    appId      : '547879418722899',
    xfbml      : true,
    version    : 'v2.5'
  });

  var fblogin=function(){
    new Clipboard('.btn-info');
    FB.login(function(response) {
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       getProfilePic();
     } else {
       console.log('User cancelled login or did not fully authorize.');
     }
   },{scope: 'user_photos,publish_actions'});
  }

  $('.btn-login').click(function(){
    $(this).hide();
    fblogin();
  })
  
  function getProfilePic(){
    $(".element").typed({
      strings: ["Please wait while we make your profile picture more beautiful."],
      typeSpeed: 0
    });
    FB.api(
      "/me/?fields=picture.width(720).height(720)",
      function (response) {
        var dp = response.picture.data.url;
        console.log(response.picture.data.url);
        var c=document.createElement("canvas");
        var ctx1=c.getContext("2d");
        var imageObj1 = new Image();
        var ctx2=c.getContext("2d");
        var imageObj2 = new Image();
        imageObj2.crossOrigin ="anonymous";
        imageObj1.crossOrigin ="anonymous";
        imageObj1.src = dp;
        imageObj1.onload = function() {
          var num=6;
          var den=7;
          var img;
          var imgData;
          
          imageObj2.src = "http://springspree.in/profilepicture/filter.png"
          imageObj2.onload = function() {
            do
            {
              img=new Image();
              var fraction=num/den;
              c.width=imageObj1.width*fraction;
              c.height=imageObj1.height*fraction;
              console.log(c.width);
              console.log(c.height);
              ctx1.drawImage(imageObj1, 0, 0,imageObj1.width,imageObj1.height,0,0,c.width,c.height);
              ctx1.drawImage(imageObj2, 0, 0,imageObj2.width,imageObj2.height,0,0,c.width,c.height);
              img.crossOrigin ="anonymous";
              img = c.toDataURL("image/png");
              var imgData = JSON.stringify(img.replace(/^data:image\/(png|jpg);base64,/, ""));
              console.log(imgData.length);
              num--;
              den--;
            }while(imgData.length>980000); 
            $('#myCanvas').hide();
            var uploadstatus;
            var req=$.ajax({
              url: 'http://springspree.in/profilepicture/receive.php',
              dataType: 'text',
              data: {'image':img},
              type: 'POST'
            });
            req.done(function(imgurl){
              console.log(imgurl);
              $('.message').show(500);
              $('#copy-text').show(500);
              $('.upload-pic').click(function(){
                $('#loader').show();
                $(this).html("Uploading photo");
                console.log($('#message-text').val());
                FB.api(
                  "/me/photos",
                  "POST",{
                    "url":imgurl,
                    "caption":$('#message-text').val(),
                  },function(response){
                    uploadstatus=response;
                    console.log(response);
                    if(response && !response.error)
                      window.location.href = 'http://www.facebook.com/photo.php?fbid='+response.id+'&makeprofile=1';
                    console.log(uploadstatus.error);
                  })
              });
              $('.cancel-upload').click(function(){window.location.href = 'http://springspree.in';});
            });
          }

          
          
        }
      });
}
};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function(){})