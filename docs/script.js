// CLICK SFX
const sfx = new Audio('assets/terraria_sfx.mp3');
const sfxTrigger = document.querySelectorAll('.click_sfx');
const sfxTriggerOnly = document.querySelectorAll('.click_sfx_only');

function playSound() {
    sfx.currentTime = 0;
    sfx.play();
}

sfxTrigger.forEach(clickable => {
    clickable.addEventListener('click', function(event) {
        event.preventDefault();
        playSound();
        setTimeout(() => {
            window.location.href = clickable.href;
        }, 300);
    });
});

sfxTriggerOnly.forEach(clickable => {
    clickable.addEventListener('click', function(event) {
        event.preventDefault();
        playSound();
    });
});

const characterDetails = {
    "the-apex": {
        name: "The Apex",
        description: "A long time ago, around the year of 69,420 BC, there exist a really powerful Knight. Without knowing his actual name, it is known that everyone refer to him as \"The Apex\". During one of his adventures, he encountered a very powerful Fire Wyvern. Unlike any other wyverns he had faced, this particular wyvern seems to possess its own consciousness. It is able to fully control their power and communicate. Besides all that, it is also phenomenally powerful.<br><br>After dueling for 12 years, both of them got exhausted and settled a draw. The Fire Wyvern then introduced itself with the name \"Rathalos, King of the Skies\". They made a deal that Rathalos should never come back to terrorize humanity, so does The Apex must protect Rathalos' family, including Rathian, Queen of the Land, Rathalos' partner. For this reason, Rathalos and Rathian will never be in any fight with human. This remarkable Rathalos is now historically known as \"The Apex Rathalos\". Unlike any regular Rathalos, it has a lot of terrible scars around its body while still being a lot more powerful.<br><br>Approaching the end of his lifetime, on the year of 999 A.D., The Apex passed his legacy to a newly promoted Knight, Wesley Aldrich, and a dedicated scientist, Kadek Artika Chintya Meliana. Thus, February 12th of the year 1001 A.D., Wesley and Artika created the Zen Academy to protect dragons from excess danger by maintaining and studying them. But of course, Rathalos and Rathian will never be an object to study.",
        image: "assets/char_apex.png"
    },
    "wesley-aldrich": {
        name: "Wesley Aldrich",
        description: "Wesley Aldrich was a young knight whose skills and dedication quickly earned him a reputation as one of the most promising warriors of his time. He came from a lineage of noble knights, but it was his own determination and prowess that propelled him to prominence. Wesley's unwavering sense of duty and his profound respect for life set him apart from his peers, making him the ideal candidate to continue the legacy of The Apex.<br><br>Wesley is characterized by his calm and thoughtful demeanor. He is a strategic thinker, always considering the broader implications of his actions. Despite his formidable combat skills, he prefers diplomacy and peaceful resolutions, embodying the principle that strength should be used to protect rather than destroy. Wesley’s empathy extends not just to humans but to all creatures, driving his commitment to maintaining the balance of Eostera's ecosystem.<br><br>As the co-founder of Zen Academy, Wesley focuses on the practical training of hunters, emphasizing non-lethal methods to manage and interact with the dragons. He is a mentor to many young hunters, instilling in them the values of respect, restraint, and the importance of preserving life. His experience and wisdom make him a pillar of the Academy, guiding its mission to protect and study dragons responsibly.",
        image: "assets/char_wesley.png"
    },
    "artika-chintya": {
        name: "Artika Chintya",
        description: "Kadek Artika Chintya Meliana, often referred to as Artika, was a brilliant and dedicated scientist whose passion for understanding the natural world was evident from a young age. Originating from a family of scholars, Artika pursued her studies with zeal, quickly becoming a leading expert in the field of dragonology. Her innovative research and compassionate approach to studying dragons set her apart in a field often dominated by fear and misunderstanding.<br><br>Artika is known for her inquisitive and analytical mind, paired with a deep-seated compassion for all living beings. She is methodical in her research, always seeking to understand the intricate details of dragon behavior and physiology. Artika’s nurturing nature makes her a beloved figure at Zen Academy, as she is always willing to share her knowledge and assist others in their studies. Her patience and kindness are as notable as her intellectual prowess.<br><br>As the co-founder of Zen Academy, Artika is responsible for the academic and research aspects of the institution. She oversees the development of study programs, ensuring that the Academy remains at the forefront of dragon research. Artika works closely with hunters and scholars alike, fostering a collaborative environment where knowledge and experience are shared freely. Her work ensures that the Academy not only protects dragons but also expands humanity’s understanding of these majestic creatures.",
        image: "assets/char_tika.png"
    }
};

function showDetails(character) {
    const details = characterDetails[character];
    const detailsContainer = document.getElementById("character-details");
    const defaultImage = document.querySelector('.details img');

    if (details) {
        detailsContainer.innerHTML = `
            <h2>${details.name}</h2>
            <p>${details.description}</p>
        `;
        defaultImage.src = details.image;
        defaultImage.alt = character;
    } else {
        detailsContainer.innerHTML = `
            <h2>Zen Academy</h2>
            <p>The Zen Academy is a place where powerful hunters are specialized to maintain the ecosystem of the Eostera. Dragons are reasonably considered monsters. While the idea of a place with monsters might sounds dystopian, the Zen Team are trained to handle the monsters without slaying any of them. This operation is for obvious reasons, namely educational purposes.</p>
        `;
        defaultImage.src = "assets/char_default.png";
        defaultImage.alt = "Character Selection Default Photo";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const charactersIcon = document.querySelectorAll(".character-icon img");
    const details = document.querySelector(".details");
    let animationRunning = false;

    charactersIcon.forEach(element => {
        element.addEventListener('click', () => {
            const allCharacterIcons = document.querySelectorAll('.character-icon');

            allCharacterIcons.forEach(icon => {
                icon.classList.remove("selected-character");
            });

            element.parentElement.classList.add("selected-character");
            
            if (!animationRunning) {
                details.classList.remove("reveal");
                details.classList.add("reveal");
                animationRunning = true;
                details.addEventListener('animationend', () => {
                    details.classList.remove("reveal");
                    animationRunning = false;
                });
            } else {
                details.classList.remove("reveal");
                void details.offsetWidth;
                details.classList.add("reveal");
            }
        }); 
    });
});


const hamburgerTriggerWidth = 750;

const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const navContainer = document.querySelector(".nav-container");
const registerButton = document.getElementById("register-button");

hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
});

function moveContentToOffScreen() {
    offScreenMenu.appendChild(navContainer);
    offScreenMenu.appendChild(registerButton);
}

function moveContentToHeader() {
    const header = document.querySelector("header");
    const btnContainer = document.querySelector(".btn-container");
    header.appendChild(navContainer);
    header.appendChild(btnContainer);
    btnContainer.appendChild(registerButton);
}

window.addEventListener("resize", () => {
    if (window.innerWidth > hamburgerTriggerWidth) {
        moveContentToHeader();
    }
    else {
        moveContentToOffScreen();
    }
}); 

if (window.innerWidth <= hamburgerTriggerWidth) {
    moveContentToOffScreen();
}
else {
    moveContentToHeader();
}


var currentIndex = 0;
var images = document.querySelectorAll('.card');
var totalImages = images.length;
var carouselImages = document.getElementById('selection');

function nextSlide() {
    if (currentIndex < totalImages - 1) {
        currentIndex++;
    }
    else {
        currentIndex -= 3;
    }
    updateCarousel();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    }
    else {
        currentIndex += 3
    }
    updateCarousel();
}

function updateCarousel() {
    var offset = currentIndex * -100 + '%';
    carouselImages.style.transform = 'translateX(' + offset + ')';
}
