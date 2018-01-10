
// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.monitor.app', // App bundle ID
  name: 'monitor', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
  init: false

});

var now = app.utils.now();
//var query = app.utils.parseUrlQuery('http://google.com/?id=5&foo=bar');
//console.log(query);

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});
var locationInfo = mainView.router.currentRoute.query;



$$(document).on('page:init', function (e) {
  var page = e.detail;
  console.log(page.query.building); 
  console.log(page.query.floors); 
  console.log(page.query.room); 
  /*var page = e.detail;
  var thisUrl = page.route.route.url
  console.log(page.route.route.url);
  var urlQuery = app.utils.parseUrlQuery(thisUrl);
  var building= urlQuery.building;
  var floors = urlQuery.floors;
  var room= urlQuery.room;
  console.log(urlQuery);*/

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
      '<i class="f7-icons">check_round</i><p>反馈提交成功！感谢您的支持.</p>'+
      '</div>'+
      '</div>',
      // Events

    });

    $$('#user-submit').click(function () {
      var username = $$('#username').val();
      var userphone = $$('#user-phone').val();
      if(username!=='' & userphone !== ''){

        /* $$.ajax({
          url:'',
          data:{'data':jsonOrder},
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




      }else if(username!=='' & userphone === ''){
        $$('.user-reminder').text('请输入电话号码');
      }else if(username==='' & userphone === ''){
        app.dialog.confirm('确定匿名提交？', '洗手间反馈调查', function () {
          //ajax and popup page

          dynamicPopup.open();

        })
      }
    })




  }


});

app.init()


