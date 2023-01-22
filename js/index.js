
AOS.init({
    duration: 1500,
    once: true
});

d=document;
d.addEventListener('click', (e)=>{
  if(e.target.matches('.examples *') && window.innerWidth<1000){
    const Redirection = e.target.closest('figure').lastElementChild.lastElementChild.lastElementChild.getAttribute
    ('href');
    e.target.closest('section').innerHTML+=`<meta http-equiv="refresh" content="0; url=${Redirection}">`;
  }

  if(e.target.matches('#menu *') && window.innerWidth<1000){
    e.target.closest('div').classList.remove('show');
  }
})

const titles = d.querySelectorAll('h2');
const titles__navbar = d.querySelectorAll('#menu li a');

const watchTitles = (entries, observer)=>{
  entries.forEach(element => {
    if(element.isIntersecting){
      titles__navbar.forEach(el=>{
        if(el.textContent == element.target.textContent){
          el.classList.add('style_menu__list')
          console.log(el);
        } else {
          el.classList.remove('style_menu__list')
        }
      })
    }
  });
}
const observator = new IntersectionObserver(watchTitles);
titles.forEach(el=>observator.observe(el));
