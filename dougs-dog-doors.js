class DogDoor {
   #open;
   #timeout;

   constructor() {
      this.#open = false;
      this.#timeout = null;
   }
   open() {
      this.#open = true;
   }
   close() {
      this.#open = false;
   }
   isOpen() {
      return this.#open;
   }

   detectBarking() {
      clearTimeout(this.#timeout);

      console.log("Detected barking! Opening the door for 5 seconds...");
      this.#open = true;

      this.#timeout = setTimeout(() => {
         console.log("Door is closed.");
         this.#open = false;
      }, 5000);
   }
}

class Remote {
   #door;
   #closeTimeoutInSeconds;
   #timeout;
   constructor(door) {
      this.#door = door;
      this.#closeTimeoutInSeconds = 5;
   }

   pressButton() {
      clearTimeout(this.#timeout);

      if (this.#door.isOpen()) {
         console.log("Door is closed.");
         this.#door.close();
      } else {
         this.#door.open();
         console.log("Pressing the remote button...");
         console.log(
            `Door is open now. Will automatically close in ${
               this.#closeTimeoutInSeconds
            } seconds.`
         );

         this.#timeout = setTimeout(() => {
            console.log("Door is closed.");
            this.#door.close();
         }, this.#closeTimeoutInSeconds * 1000);
      }
   }
}

const dogDoor = new DogDoor();
const remote = new Remote(dogDoor);

dogDoor.detectBarking();

setTimeout(() => {
   dogDoor.detectBarking();
}, 3000);
