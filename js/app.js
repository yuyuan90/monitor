
// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app',
  id: 'io.monitor.app',
  name: 'monitor',
  theme: 'auto',
  // App root data
  data: function () {
    return {
      user: {
        firstName: '',
        lastName: '',
      },
    };
  },
  // App root methods
  methods: {

  },
  routes: routes,
  init: false

});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});



$$(document).on('page:init', function (e) {

  var page = e.detail;
  var thisUrl = window.location.href;
  var urlQuery = app.utils.parseUrlQuery(thisUrl);
  var building= urlQuery.building;
  var floors = urlQuery.floors;
  var room= urlQuery.room;

  $$('.building').text(building);
  $$('.floors').text(floors);
  $$('.room').text(room);

  //last clean time



  //user-form page

  if (page.name === 'user-form') {
    //star
    $$('.stars a').click(function () {

      $$('.stars i').text('star');

      var starIndex = $$(this).attr('data-star');

      for (var i = 0; i <= starIndex; i++) {
        $$('.stars i').eq(i).text('star_fill');
      }

    });

    //check phone num
    $$('input[type="tel"]').on('keyup', function () {
      var phoneNum = $$('#user-phone').val();

      if (! phoneNum.match(/^-?\d+$/) && phoneNum !== '') {
        $$('.user-reminder').text('请输入数字');
      }else{
        $$('.user-reminder').text('');
      }
    });

    //check anonymous
    // Create dynamic Popup
    var dynamicPopup = app.popup.create({
      content: '<div class="popup" id="user-popup">'+
      '<div class="block">'+
      '<i class="f7-icons">check_round</i><p>反馈提交成功，感谢您的支持！</p>'+
      '</div>'+
      '</div>',
      // Events

    });


    $$('#user-submit').click(function () {
      var username = $$('#username').val();
      var userphone = $$('#user-phone').val();
      if(username!=='' & userphone !== ''){



        dynamicPopup.open();


        /*$$.ajax({
          url:'',
          data:{'data':''},
          type:'POST',
          beforeSend:function(){
            myApp.showPreloader('正在发送');
          },
          success:function(data)
          {
            myApp.hidePreloader();
            dynamicPopup.open();
            console.log(data);
            if(data =='success')
            {

              alert('success');
            }
            else
            {
              alert('no data');
            }

          }
        });*/




      }else if(username==='' & userphone !== ''){
        $$('.user-reminder').text('请输入您的姓名');
      }else if(username !=='' & userphone === ''){
        $$('.user-reminder').text('请输入电话号码');
      }else if(username==='' & userphone === ''){
        app.dialog.confirm('确定匿名提交？', '洗手间反馈调查', function () {
          //ajax and popup page
          app.request.post('http://10.17.41.107:801/swagger/#!/Toilet/ApiServicesAppToiletJobContentPost', function (data) {
            console.log(data);
          });

          dynamicPopup.open();

        })
      }
    })

  };


  //cleaner-code page
  if(page.name==='cleaner-code'){
    $$('#cleaner-code-submit').click(function () {
      //if success
      mainView.router.navigate('/cleaner-form/')
    })

  };


  //manager-code page
  if(page.name==='manager-code'){
    $$('#manager-code-submit').click(function () {
      //if success
      mainView.router.navigate('/manager-rating/',{
              context:{
                'test':90
              }
            });
    })

  };

  //manager-rating page
  if(page.name==='manager-rating'){

    $$('#manager-submit').click(function () {
      //ajax
      app.dialog.alert('评价成功，谢谢！','洗手间反馈调查');
          //clear form
      $$('.manager-comment textarea').val('');
      $$('input[type="checkbox"]').prop('checked', true);


    });

    //human resources


  }


});

app.init()


