/*
 * Модальное окно
 */

var modal = (function () {
	var SETTINGS = {
		showLinksSelector: 'a.js-modal',
		modalClassForHtml: 'l-theater',
		modalHtml:
			'<div class="l-modal"> \
				<div class="l-modal-outer"> \
					<div class="l-modal-inner"> \
						<div class="l-modal-container"></div> \
					</div> \
				</div> \
			</div>',
		modalOuterSelector: '.l-modal-outer',
		modalInnerSelector: '.l-modal-container',
		hideLinkSelector: '.b-close-modal',
		gallery: {
			html:
				'<div class="b-modal-gallery"> \
					<div class="slide prev-prev"> \
						<img class="image"/> \
					</div> \
					<div class="slide prev"> \
						<img class="image"/> \
					</div> \
					<div class="slide current"> \
						<img class="image"/> \
					</div> \
					<div class="slide next"> \
						<img class="image"/> \
					</div> \
					<div class="slide next-next"> \
						<img class="image"/> \
					</div> \
					<a class="b-graphics b-graphics-prev" href="?"><b></b></a> \
					<a class="b-graphics b-graphics-next" href="?"><b></b></a> \
				</div> \
				<a class="b-close-modal" href="?"> \
					<b class="b-icon b-icon-close"><b>Закрыть</b></b> \
				</a>',
			singleClass: 'b-modal-gallery-single',
			prevPrevSelector: '.prev-prev',
			prevSelector: '.prev',
			currentSelector: '.current',
			nextSelector: '.next',
			nextNextSelector: '.next-next',
			imageSelector: '.image',
			wideImageClass: 'wide-image',
			tallImageClass: 'tall-image',
			nearImagesPosition: 266,
			prevControlSelector: '.b-graphics-prev',
			prevControlDisabledClass: 'b-graphics-disabled-prev',
			nextControlSelector: '.b-graphics-next',
			nextControlDisabledClass: 'b-graphics-disabled-next',
			animationTime: 500
		}
	};
	
	var _html, _body, _container, _outer, _inner,
		_showLinks, _showLinksGroup, _hideLink,
		_gallery, _inlineContainer;
	
	function prepareHtml(){
		_container = $(SETTINGS.modalHtml);
		_outer = $(SETTINGS.modalOuterSelector, _container);
		_inner = $(SETTINGS.modalInnerSelector, _container);
		_hideLink = $(SETTINGS.hideLinkSelector);
		
		_body.append(_container);
	}
	
	function assignEvents(){
		_showLinks.live('click', function(event){
			var thisLink = $(this);
			
			showContents(thisLink.attr('href'), thisLink.attr('rel'), thisLink);
			showContainer();
			
			event.preventDefault();
		});
		
		_hideLink.live('click', function(event){
			clearContents();
			hideContainer();
			
			event.preventDefault();
		});
		
		_body.keyup(function(event){
			var keycode = (event == null) ? event.keyCode : event.which;
			
			if( keycode == 27 ){
				_hideLink.click();
			}
		});
	}
	
	function showContents(url, group, link){
		var urlWithoutQuery = url,
			queryPosition = url.indexOf('?'),
			typeRegexp = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$|\.html$|\.htm$/;
		
		if( queryPosition != -1 ){
			urlWithoutQuery = url.substring(0, queryPosition);
		}
		
		var urlType = urlWithoutQuery.toLowerCase().match(typeRegexp);
		
		if( urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' ){
			_gallery = {};
			
			_gallery.container = $(SETTINGS.gallery.html);
			_gallery.current = $(SETTINGS.gallery.currentSelector, _gallery.container);
			_gallery.currentImage = $(SETTINGS.gallery.imageSelector, _gallery.current);
			
			if( group ){
				_showLinksGroup = _showLinks.filter('[rel=' + group + ']');
				_gallery.currentIndex = _showLinksGroup.index(link);
				
				_gallery.prevPrev = $(SETTINGS.gallery.prevPrevSelector, _gallery.container);
				_gallery.prev = $(SETTINGS.gallery.prevSelector, _gallery.container);
				_gallery.next = $(SETTINGS.gallery.nextSelector, _gallery.container);
				_gallery.nextNext = $(SETTINGS.gallery.nextNextSelector, _gallery.container);
				
				_gallery.prevPrevImage = $(SETTINGS.gallery.imageSelector, _gallery.prevPrev);
				_gallery.prevImage = $(SETTINGS.gallery.imageSelector, _gallery.prev);
				_gallery.nextImage = $(SETTINGS.gallery.imageSelector, _gallery.next);
				_gallery.nextNextImage = $(SETTINGS.gallery.imageSelector, _gallery.nextNext);
				
				_gallery.prevControl = $(SETTINGS.gallery.prevControlSelector, _gallery.container);
				_gallery.nextControl = $(SETTINGS.gallery.nextControlSelector, _gallery.container);
				
				loadGalleryNearImages();
				
				//manageGalleryControls();
			}
			else{
				_gallery.container.addClass(SETTINGS.gallery.singleClass);
			}
			
			assignGalleryEvents();
			
			_gallery.currentImage.hide().load(function(){
				alignGalleryImage(_gallery.current, _gallery.currentImage, 'center');
				_gallery.currentImage.show();
			}).attr('src', url);
			
			_container.append(_gallery.container);
			_outer.hide();
			_hideLink = $(SETTINGS.hideLinkSelector);
		}
		else if( urlType == '.html' || urlType == '.htm' ) {
			_inner.load(url += '&random=' + (new Date().getTime()));
		}
		else if( url.substr(0, 1) == '#' ){
			_inlineContainer = $(url);
			
			if( _inlineContainer.length ){
				_inner.append(_inlineContainer.children());
			}
		}
	}
	
	function loadGalleryNearImages(){
		if( _gallery.currentIndex < _showLinksGroup.length - 1 ){
			_gallery.nextImage.hide().load(function(){
				alignGalleryImage(_gallery.next, _gallery.nextImage, 'left');
				_gallery.nextImage.show();
			}).attr('src', _showLinksGroup.eq(_gallery.currentIndex + 1).attr('href'));
		}
		if( _gallery.currentIndex > 0 ){
			_gallery.prevImage.load(function(){
				alignGalleryImage(_gallery.prev, _gallery.prevImage, 'right');
				_gallery.prevImage.show();
			}).attr('src', _showLinksGroup.eq(_gallery.currentIndex - 1).attr('href'));
		}
		loadNextNextImage();
		loadPrevPrevImage();
	}
	
	function loadNextNextImage(){
		if( _gallery.currentIndex < _showLinksGroup.length - 2 ){
			_gallery.nextNextImage.load(function(){
				_gallery.nextNextImage.removeClass(SETTINGS.gallery.wideImageClass).removeClass(SETTINGS.gallery.tallImageClass).css('margin', 0);
				alignGalleryImage(_gallery.nextNext, _gallery.nextNextImage, 'left');
				_gallery.nextNextImage.show();
			}).attr('src', _showLinksGroup.eq(_gallery.currentIndex + 2).attr('href'));
		}
	}
	
	function loadPrevPrevImage(){
		if( _gallery.currentIndex > 1 ){
			_gallery.prevPrevImage.load(function(){
				_gallery.prevPrevImage.removeClass(SETTINGS.gallery.wideImageClass).removeClass(SETTINGS.gallery.tallImageClass).css('margin', 0);
				alignGalleryImage(_gallery.prevPrev, _gallery.prevPrevImage, 'right');
				_gallery.prevPrevImage.show();
			}).attr('src', _showLinksGroup.eq(_gallery.currentIndex - 2).attr('href'));
		}
	}
	
	function alignGalleryImage(imageContainer, image, horizontalAlign){
		var imageWidth = image.width(),
			imageHeight = image.height(),
			descreasingRatio = 1;
		
		if( imageContainer.width() / imageContainer.height() < imageWidth / imageHeight ){
			if( imageContainer.width() < imageWidth ){
				descreasingRatio = imageContainer.width() / imageWidth;
				image.addClass(SETTINGS.gallery.wideImageClass);
			}
			else{
				image.css('margin-left', (imageContainer.width() - imageWidth) / 2);
			}
			
			if( horizontalAlign == 'left' ) {
				image.css('margin-left', -SETTINGS.gallery.nearImagesPosition);
			}
			else if( horizontalAlign == 'right' ) {
				image.css('margin-left', imageContainer.width() - imageWidth * descreasingRatio + SETTINGS.gallery.nearImagesPosition);
			}
			
			image.css('margin-top', (imageContainer.height() - imageHeight * descreasingRatio) / 2);
		}
		else{
			if( imageContainer.height() < imageHeight ){
				descreasingRatio = imageContainer.height() / imageHeight;
				image.addClass(SETTINGS.gallery.tallImageClass);
			}
			else{
				image.css('margin-top', (imageContainer.height() - imageHeight ) / 2);
			}
			
			if( horizontalAlign == 'center' ){
				image.css('margin-left', (imageContainer.width() - imageWidth * descreasingRatio) / 2);
			}
			else if( horizontalAlign == 'left' ) {
				image.css('margin-left', -SETTINGS.gallery.nearImagesPosition);
			}
			else if( horizontalAlign == 'right' ) {
				image.css('margin-left', imageContainer.width() - imageWidth * descreasingRatio + SETTINGS.gallery.nearImagesPosition);
			}
		}
	}
	
	/*
	function manageGalleryControls(){
		if( _showLinksGroup.length > 1 ){
			if( _currentLink == 0 ){
				_gallery.prevControl.addClass(SETTINGS.gallery.prevControlDisabledClass);
			}
			else{
				_gallery.prevControl.removeClass(SETTINGS.gallery.prevControlDisabledClass);
			}
			
			if( _currentLink == _showLinksGroup.length - 1 ){
				_gallery.nextControl.addClass(SETTINGS.gallery.nextControlDisabledClass);
			}
			else{
				_gallery.nextControl.removeClass(SETTINGS.gallery.nextControlDisabledClass);
			}
		}
		else{
			_gallery.container.addClass(SETTINGS.gallery.singleClass);
		}
	}
	*/
	
	function assignGalleryEvents(){
		_gallery.prevControl.click(function(event){
			if( _gallery.currentIndex > 0 && !_gallery.container.data('animating') ){
				_gallery.container.data('animating', true);
				_gallery.currentIndex--;
				
				_gallery.prevPrev.animate({ left: '-100%' }, SETTINGS.gallery.animationTime);
				_gallery.prev.animate({ left: '0' }, SETTINGS.gallery.animationTime);
				_gallery.current.animate({ left: '100%' }, SETTINGS.gallery.animationTime);
				
				_gallery.prevImage.animate({
					marginLeft: (_gallery.prev.width() - _gallery.prevImage.width()) / 2
				}, SETTINGS.gallery.animationTime);
				
				_gallery.currentImage.animate({
					marginLeft: -SETTINGS.gallery.nearImagesPosition
				}, SETTINGS.gallery.animationTime);
				
				_gallery.next.animate({
					left: '200%'
				}, SETTINGS.gallery.animationTime, function(){
					var tempContainer = _gallery.nextNext,
						tempImage = _gallery.nextNextImage;
					
					_gallery.nextNext = _gallery.next;
					_gallery.next = _gallery.current;
					_gallery.current = _gallery.prev;
					_gallery.prev = _gallery.prevPrev;
					_gallery.prevPrev = tempContainer;
					
					_gallery.nextNextImage = _gallery.nextImage;
					_gallery.nextImage = _gallery.currentImage;
					_gallery.currentImage = _gallery.prevImage;
					_gallery.prevImage = _gallery.prevPrevImage;
					_gallery.prevPrevImage = tempImage;
					
					_gallery.prevPrev.css('left', '-200%');
					loadPrevPrevImage();
					
					_gallery.container.data('animating', false);
				});
			}
			
			event.preventDefault();
		});
		
		_gallery.nextControl.click(function(event){
			if( _gallery.currentIndex < _showLinksGroup.length - 1 && !_gallery.container.data('animating') ){
				_gallery.container.data('animating', true);
				_gallery.currentIndex++;
				
				_gallery.prev.animate({ left: '-200%' }, SETTINGS.gallery.animationTime);
				_gallery.current.animate({ left: '-100%' }, SETTINGS.gallery.animationTime);
				_gallery.next.animate({ left: '0' }, SETTINGS.gallery.animationTime);
				
				_gallery.currentImage.animate({
					marginLeft: _gallery.current.width() - _gallery.currentImage.width() + SETTINGS.gallery.nearImagesPosition
				}, SETTINGS.gallery.animationTime);
				
				_gallery.nextImage.animate({
					marginLeft: (_gallery.next.width() - _gallery.nextImage.width()) / 2
				}, SETTINGS.gallery.animationTime);
				
				_gallery.nextNext.animate({
					left: '100%'
				}, SETTINGS.gallery.animationTime, function(){
					var tempContainer = _gallery.prevPrev,
						tempImage = _gallery.prevPrevImage;
					
					_gallery.prevPrev = _gallery.prev;
					_gallery.prev = _gallery.current;
					_gallery.current = _gallery.next;
					_gallery.next = _gallery.nextNext;
					_gallery.nextNext = tempContainer;
					
					_gallery.prevPrevImage = _gallery.prevImage;
					_gallery.prevImage = _gallery.currentImage;
					_gallery.currentImage = _gallery.nextImage;
					_gallery.nextImage = _gallery.nextNextImage;
					_gallery.nextNextImage = tempImage;
					
					_gallery.nextNext.css('left', '200%');
					loadNextNextImage();
					
					_gallery.container.data('animating', false);
				});
			}
			
			event.preventDefault();
		});
	}
	
	function switchGalleryImage(){
		//_gallery.mainImage.attr('src', _showLinksGroup.eq(_currentLink).attr('href') );
		//manageGalleryControls();
	}
	
	function clearContents(){
		if( typeof _inlineContainer === 'object' && _inlineContainer.hasOwnProperty('length') && _inlineContainer.length ){
			_inlineContainer.append(_inner.children());
			_inlineContainer = '';
		}
		
		
		if( typeof _gallery === 'object' && _gallery.hasOwnProperty('container') ){
			_gallery.container.remove();
			_outer.show();
		}
		
		_inner.html('');
	}
	
	function showContainer(){
		if( $.browser.mozilla ){
			_body.addClass(SETTINGS.modalClassForHtml);
		}
		else{
			if( $.browser.msie && $.browser.version == '6.0' ){
				_html.scrollTop(0);
			}
			_html.addClass(SETTINGS.modalClassForHtml);
		}
		
		_container.show();
	}
	
	function hideContainer(){
		if( $.browser.mozilla ){
			_body.removeClass(SETTINGS.modalClassForHtml);
		}
		else{
			_html.removeClass(SETTINGS.modalClassForHtml);
		}
		
		_container.hide();
	}
	
	return {
		init: function(userSettings){
			$.extend(SETTINGS, userSettings);
			
			_html = $(document.documentElement);
			_body = $(document.body);
			_showLinks = $(SETTINGS.showLinksSelector);
			
			prepareHtml();
			assignEvents();
		},
		show: function(url){
			showContents(url);
			showContainer();
		},
		hide: function(){
			clearContents();
			hideContainer();
		}
	};
})();

$(function(){
	modal.init();
});