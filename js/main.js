const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

//cart

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');

const openModal = (event) => {
	modalCart.classList.add('show');
	document.addEventListener('keydown', escapeHandler);
}

const closeModal = () => {
	modalCart.classList.remove('show');
	document.removeEventListener('keydown', escapeHandler);
}

const escapeHandler = event => {
	if (event.code === 'Escape') closeModal();
}

modalCart.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal-close') || !e.target.closest('.modal')) {
		closeModal();
	}
})

buttonCart.addEventListener('click', openModal);

//scroll smoothly
(() => {
	const scrollLink = document.querySelectorAll('a.scroll-link ');

	for (let i = 0; i < scrollLink.length; i++) {
		scrollLink[i].addEventListener('click', (event) => {
			event.preventDefault();
			const id = scrollLink[i].getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	}
})()
