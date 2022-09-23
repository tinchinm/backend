class User{
    constructor(names, lastName, books, pets){
        this.names = names;
        this.lastName = lastName;
        this.books = books || [];
        this.pets = pets || [];
    }

    getFullName(){
        return `${this.names} ${this.lastName}`;
    }

    addPet(string){
        this.pets.push(string);
    }

    countPets(){
        return this.pets.length;
    }

    addBook(bookName, writer){
        this.books.push({bookName, writer});
    }

    getBookNames(){
        return this.books.map(({bookName}) => bookName);
    }
}

const user1 = new User("Martin", "Marzialetti")

console.log(`Hola yo soy ${user1.getFullName()}`);

console.log("Cantidad de Mascotas: " + user1.countPets());

user1.addPet("Suri");

user1.addPet("Pompo");

console.log("Cantidad de Mascotas: " + user1.countPets());

console.log("Mis mascotas son: " + `${user1.pets}`);

console.log("En mi biblioteca tengo los libros: " + user1.getBookNames());

user1.addBook("Harry Potter y la Piedra Filosofal", "J.K. Rowlin");

user1.addBook("Los hombres que no amaban a las mujeres", "Stieg Larsson");

console.log("En mi biblioteca tengo los libros: " + user1.getBookNames());