// //popup-form-login
//  let linkLogin = document.querySelector('.main-nav__link--login');
//  let popupLogin = document.querySelector('.login-popup');
//  let closeLogin = document.querySelector('.close-login')

// linkLogin.addEventListener("click" , function(event){
// 	event.preventDefault();
// 	popupLogin.classList.toggle('login__show');
// });
// closeLogin.addEventListener("click" , function(event){
// 	event.preventDefault();
// 	popupLogin.classList.remove('login__show');
// });

// $ (function(){
// $ ('.main-nav__link--login').click(function(){
// $ ('.login__show').hide().show(500);
//   });
// }); 
var block_show = false;
 
function scrollTracking(){
	if (block_show) {
		return false;
	}
 
	var wt = $(window).scrollTop();
	var wh = $(window).height();
	var et = $('.active').offset().top;
	var eh = $('.active').outerHeight();
	var dh = $(document).height();   
 
	if (wt + wh >= et || wh + wt == dh || eh + et < wh){
		block_show = true;
		
		// Код анимации
		$('.active div:eq(0)').show('fast', function(){
			$(this).next().show('fast', arguments.callee);
		});
	}
}
 
$(window).scroll(function(){
	scrollTracking();
});
	
$(document).ready(function(){ 
	scrollTracking();
});