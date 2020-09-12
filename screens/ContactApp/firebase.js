import firestore from '@react-native-firebase/firestore';

function fetchData() {
  return new Promise(function (resolve, reject) {
    firestore()
      .collection('Contacts')
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          const userSpecification = {
            id: documentSnapshot.id,
            user: documentSnapshot.data(),
          };
          users.push(userSpecification);
        });
        resolve(users);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
export default {fetchData};
