window.startCarousel = function () {
    $(document).ready(function() { console.log('lol'); t_sldsInit('91968907'); t675_init('91968907'); }); $('.t675').bind('displayChanged',function(){ t_slds_updateSlider('91968907'); });
}

window.startSubscribe = function () {
    $(document).ready(function() {	jQuery.cachedScript = function( url ) { var options = { dataType: "script", cache: true, url: url }; return jQuery.ajax( options );	};	$.cachedScript("js/tilda-zero-forms-1.0.min.js").done(function( script, textStatus ) {	if(textStatus=='success'){	setTimeout(function(){	var recid='95219824';	var elemid='1553514491797';	t_zeroForms__init(recid,elemid);	},500);	}else{	console.log('Error init form in zeroblock. Err:'+textStatus);	}	});	});
    $( document ).ready(function() { t396_init('95219824');});
}

window.startSignin = function () {
    $(document).ready(function(){ setTimeout(function(){ t702_initPopup('95019306'); }, 500);});
    $( document ).ready(function() { t396_init('95300198');});
    $( document ).ready(function() { t396_init('92162158');
    });
    $( document ).ready(function() { t396_init('92158513');});
    $(document).ready(function() {	jQuery.cachedScript = function( url ) { var options = { dataType: "script", cache: true, url: url }; return jQuery.ajax( options );	};	$.cachedScript("js/tilda-zero-forms-1.0.min.js").done(function( script, textStatus ) {	if(textStatus=='success'){	setTimeout(function(){	var recid='92158513';	var elemid='1553409660383';	t_zeroForms__init(recid,elemid);	},500);	}else{	console.log('Error init form in zeroblock. Err:'+textStatus);	}	});	});
}

window.startProfile = function () {
    $(document).ready(function() {	jQuery.cachedScript = function( url ) { var options = { dataType: "script", cache: true, url: url }; return jQuery.ajax( options );	};	$.cachedScript("js/tilda-zero-forms-1.0.min.js").done(function( script, textStatus ) {	if(textStatus=='success'){	setTimeout(function(){	var recid='92163768';	var elemid='1553417429882';	t_zeroForms__init(recid,elemid);	},500);	}else{	console.log('Error init form in zeroblock. Err:'+textStatus);	}	});	});
    $( document ).ready(function() { t396_init('92163768');});

}

window.startPreorder = function () {
    t396_init('97517092');
}

window.startSearch = function () {
    $( document ).ready(function() { t396_init('95016169');});
}

window.startCart = function () {
    $( document ).ready(function() { t396_init('97521283');});
}

window.rerun = function () {
    window.ok()
}



window.ok =
    function(){
        setTimeout(function(){
            lazyload_cover = new LazyLoad({
                elements_selector: ".t-cover__carrier",
                show_while_loading:false,
                data_src: "content-cover-bg",
                placeholder:'',
                threshold: 700
            });
        }, 100);

        setTimeout(function(){
            lazyload_img = new LazyLoad({
                elements_selector: ".t-img",
                threshold: 800,
            });
            lazyload_bgimg = new LazyLoad({
                elements_selector: ".t-bgimg",
                show_while_loading:false,
                placeholder:'',
                threshold: 800,
            });
            lazyload_iframe = new LazyLoad({
                elements_selector: ".t-iframe"
            });

            $(document).bind('slide.bs.carousel', function (e) {
                setTimeout(function() {
                    lazyload_cover.update();
                    lazyload_img.update();
                    lazyload_bgimg.update();
                }, 500);
            });

            if($isMobile){
                $('body').append("<div class='t-mbfix'></div>");
                setTimeout(function(){
                    $('.t-mbfix').addClass('t-mbfix_hide');
                }, 50);
                setTimeout(function(){
                    $('.t-mbfix').remove();
                }, 1000);
            }

        }, 500);
    };