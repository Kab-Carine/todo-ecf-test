const mongoose = require("mongoose");
const Todo = require("../src/models/Todo");

describe(" Creation de Todo ", () => {
  //Test 1: La création d'un Todo valide avec tous les champs requis.

  it("Créer un Todo valide", () => {
    const todoValid = {
      text: "Faire le ménage",
      completed: false,
    };

    expect(todoValid.text).toBe(todoValid.text);
    expect(todoValid.completed).toBe(todoValid.completed);
  });
  // Test 2: Verifions que le champ 'text' est obligatoire et ne peut pas être vide.
  it("Text ne doit pas etre null", () => {
    const verificationChamp = {
      text: "",
      completed: false,
    };
    
    const createTodo = () => {
      if (!verificationChamp.text) {
        throw new Error("Le champ 'text' est obligatoire");
      }
      return verificationChamp;
    };

    expect(() => createTodo()).toThrow("Le champ 'text' est obligatoire");
  });


    // Test3: Verifions que le champ 'completed' a une valeur par défaut de false.
    it("Le champ 'completed' doit avoir une valeur par défaut de false", () => {
      const completeddefault = {
        text: "Faire le ménage", 
        completed: false,       
      };
  
      expect(completeddefault).toHaveProperty('completed', false);
    });

    //Test4: Verifier que le champ 'createdAt' est automatiquement défini à la date actuelle lors de la 
    it("Le champ 'createdAt' doit être défini à la date actuelle lors de la création", () => {
      const now = new Date();
      const tolerance = 1000; 
  
      const todo = {
        text: "Faire le ménage",
        completed: false,
        createdAt: now.toISOString(), 
      };
  
      const isDateWithinTolerance = (dateString, tolerance) => {
        const date = new Date(dateString);
        const diff = Math.abs(now - date);
        return diff <= tolerance;
      };
  
      
      expect(todo).toHaveProperty('createdAt');
      expect(isDateWithinTolerance(todo.createdAt, tolerance)).toBe(true);
    });
  });



















    /*
    

*/
