class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {

    // start with immediate offspring
    let offspringCount = this.offspring.length;

    this.offspring.forEach((offspring) => {
      // add any offspring of offspring
      offspring += offspring.numberOfOffspring;
    })

    return offspringCount;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {

    if(this.creator === null){
      // this is the original vampire
      return 0;
    } else {
      // return depth of tree to parent, plus 1.
      return 1 + this.creator.numberOfVampiresFromOriginal;
    }

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal){
      return true;
    } else {
      return false;
    }


  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    let ancestor = null;

    // iterate lineages from youngest to oldest and store first common ancestor.
    this.lineage.forEach((thisAncestor) => {
      vampire.lineage.forEach((otherAncestor) => {
        if(thisAncestor.name === otherAncestor.name){


          if(ancestor === null){
            // only save the first common ancestor we find.
            ancestor = thisAncestor;
          }
        }
      });
    });
    return ancestor;

  }

  get lineage(){
    // return an array of vampire object corresponding to the lineage of this vampire
    if(this.creator === null){
      return [this];
    } else {
      return [this].concat(this.creator.lineage);
    }
  }
}

module.exports = Vampire;
