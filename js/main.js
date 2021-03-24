//------------------------------------1
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
	//есть класс || есть родитель с классом
	if (e.target.classList.contains('modal-close') || !e.target.closest('.modal')) {
		closeModal();
	}
})

buttonCart.addEventListener('click', openModal);

//scroll smoothly
//Плавный скрол, встроенная js функция
(() => {
	const scrollLinks = document.querySelectorAll('a.scroll-link ');

	for (const scrollLink of scrollLinks) {
		scrollLink.addEventListener('click', (event) => {
			event.preventDefault();
			const id = scrollLink.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	}
})()

//----------------------------2
//goods

const more = document.querySelector('.more');
const navigationLink = document.querySelectorAll('.navigation-link');
const longGoodsList = document.querySelector('.long-goods-list');

const getGoods = async () => {
	const result = await fetch('db/db.json');
	if (!result.ok) {
		throw `ОШИБКА ${result.status}`
	}
	return await result.json();
}

const crateCard = ({ name, label, img, description, price, id }) => {
	const card = document.createElement('div');
	card.classList.add('col-lg-3', 'col-sm-6'); //можно и className
	card.innerHTML = `<div class="goods-card">
	${label ?
			`<span class="label">${label}</span>`
			: ''
		}
						<img src="db/${img}" alt="image: ${name}" class="goods-image">
						<h3 class="goods-title">${name} Hoodie</h3>
						<p class="goods-description">${description}</p>
						<button class="button goods-card-btn add-to-cart" data-id="${id}">
							<span class="button-price">$${price}</span>
						</button>
					</div>`

	return card;
}

const renderCards = (dataCards) => {
	longGoodsList.textContent = ''; //быстрее чем innerHTML
	const cards = dataCards.map(card => crateCard(card));
	longGoodsList.append(...cards);
	document.body.classList.add('show-goods');
}

const filterCards = (field, value) => {
	getGoods().then((res) => {
		const filteredGoods = res.filter((good) => {
			return good[field] === value;
		})
		return filteredGoods;
	})
		.then((res) => renderCards(res))

}

navigationLink.forEach(link => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		const field = link.dataset.field;
		const value = link.dataset.type;
		if (value === 'All') getGoods().then((res) => renderCards(res));
		else filterCards(field, value);
	})
})



more.addEventListener('click', (event) => {
	event.preventDefault();
	getGoods().then((res) => renderCards(res))
})
