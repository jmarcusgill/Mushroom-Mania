app.run((FIREBASE_CONFIG) => {
   firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("MushroomCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {






  let getItemList = () => {
    // this is different from the scope items.
    let itemz = [];
    // return new Promise ... would go here, instead you use $q
    return $q((resolve, reject) => {
      // $.ajax().done().fail ... this is what we were using. nad becasue there is another lib you need to put in the argument.
      $http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
      .then((fbItems)=> {
        let itemCollection = fbItems.data;
        Object.keys(itemCollection).forEach((key) => {
            itemCollection[key].id=key;
            itemz.push(itemCollection[key]);
          });
          console.log("resultz", itemz);
          resolve(itemz);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  let getItems = () => {
      getItemList().then((itemz)=>{
        $scope.items = itemz;
      }).catch((error)=>{
        console.log("got and error", error);
      });
    };

  getItems();







});