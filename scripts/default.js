$(document).ready(function(){
  
  

  // memberforms
  

    $('form.memberContactForm').each(function(){
        
  
    $(this).validate({

        submitHandler: function(form) {
            var domF = $(form);
            var domM = $(form).parent().find('div.memberContactMsg');

            $.ajax({
                type: "POST",
                url: '/config/jesperAjaxForms/ajaxform.ashx',
                data: $(form).serialize(),
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",

                success: function(msg) {
                    var resultat = msg;
                    domF.hide();  
                    domM.show();
                    domM.html(msg.message);

                },
                error: function(e) {
                    alert('Unknown error');
                }
            });

        },

        rules: {

            medlemsnummer: { }, navn: { required:true,minlength:5,maxlength:125}, email: { required:true,email:true,minlength:5}, besked: { minlength:5,maxlength:1000}
        },
        messages: {

            medlemsnummer: { }, navn: { required: "Indtast navn",minlength:"Min {0}",maxlength:"Max {0}"}, email: { required: "Indtast email",email:"Email er forkert",minlength:"Email er for kort"}, besked: { minlength:"For kort",maxlength:"For lang besked"}
        }


    }); // validate
    }); // each
  
    
    $('div.modal').on('show', function () {
      $(this).find("div.memberContactMsg").hide();
      $(this).find("form").show();

 
   });
  
  
  $('.clickable').each(function(index) {
    $(this).attr('title',$(this).find('a').attr('title'));
    if($(this).hasClass('external')) {
      $(this).click(function() {
        window.open($(this).find('a').attr('href'));
      });
    } else {
      $(this).click(function() {
        location.href = $(this).find('a').attr('href');
      });
    }
  });

  $('.nav-list li').hover(
    function () {
      $(this).find('a').removeAttr('title');
      //show its submenu
      $('ul', this).stop().slideDown(500,"easeOutBounce");
    },
    function () {
      //hide its submenu
      $('ul', this).stop().slideUp(200,"easeOutBounce");
    }
  );

  

}); 

      $(document).ready(function() { 
        
        $('#searchmembers').keydown(function (e){
			filtermembers($('#searchmembers').val());
            if(e.keyCode == 13){
              filtermembers($('#searchmembers').val());
              return false;
            }
        })
        
        $('#btnsearchmembers').bind('click', function() {
          filtermembers($('#searchmembers').val());
        });
        
             $('#btnshowmembers').bind('click', function() {
               $('#searchmembers').val('');
          $('tr.sm').show();
        });
        //ag
        $( ".menu__trigger" ).click(function() {
          $( ".nav-list" ).slideToggle( "slow" );
        });
        $( ".drop__trigger" ).click(function() {
          $( this ).next().toggleClass( "openDrop" );
        });
          
      }); 
    
    function filtermembers(filtertext) {
    
 
    $('tr.sm').hide();    
      
            $("td").filter(function() {
    return $(this).text().toLowerCase().indexOf(filtertext) > -1;
}).closest("tr").show();
      
    
    }