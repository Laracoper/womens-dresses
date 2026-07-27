const categories = ['Мини-юбка', 'Вечернее платье', 'Миди-платье', 'Макси-платье', 'Коктейльное платье'];
const colors = ['black', 'red', 'white', 'blue', 'beige', 'pink'];
const allSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
const materials = ['Шелк', 'Хлопок', 'Атлас', 'Трикотаж'];
const seasons = ['Лето', 'Зима', 'Демисезон'];

// Функция генерации случайного элемента из массива
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Функция генерации нескольких случайных элементов (для размеров и цветов)
const getRandomItems = (arr, maxCount) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * maxCount) + 1);
};

export const generateProducts = () => {
    const products = [];
    
    for (let i = 1; i <= 299; i++) {
        const category = getRandomItem(categories);
        const material = getRandomItem(materials);
        
        products.push({
            id: i,
            name: `${category} из коллекции "${material}" #${i}`,
            category: category,
            price: Math.floor(Math.random() * (12000 - 1500 + 1)) + 1500, // цена от 1500 до 12000 руб
            sizes: getRandomItems(allSizes, 4), // 1-4 случайных размера
            colors: getRandomItems(colors, 3), // 1-3 случайных цвета
            material: material,
            season: getRandomItem(seasons),
            rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)), // рейтинг от 3.0 до 5.0
            image: `https://picsum.photos{(i % 50) + 10}/300/400` // заглушка картинок (чтобы не упал лимит сервиса)
        });
    }
    
    return products;
};
