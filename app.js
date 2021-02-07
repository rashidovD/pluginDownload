import firebase from "firebase/app";
import "firebase/storage";
import { upload } from "./upload";

const firebaseConfig = {
  apiKey: "AIzaSyDd2SK5ZpLy20cFYKzp_7_ixChfKsCS5io",
  authDomain: "fe-upload-88743.firebaseapp.com",
  projectId: "fe-upload-88743",
  storageBucket: "fe-upload-88743.appspot.com",
  messagingSenderId: "792528968795",
  appId: "1:792528968795:web:87804503ade1ba6298737e",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

console.log(storage);

upload("#file", {
  multi: true,
  accept: [".png", ".jpg", "jpeg", ".gif"],
  onUpload(files, blocks) {
    files.forEach((file, idx) => {
      const ref = storage.ref(`images/${file.name}`);
      const task = ref.put(file);

      task.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(
              0
            ) + "%";
          const block = blocks[idx].querySelector(".preview-info-progress");
          block.textContent = percentage;
          block.style.width = percentage;
        },
        (error) => {
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
          });
        }
      );
    });
  },
});
