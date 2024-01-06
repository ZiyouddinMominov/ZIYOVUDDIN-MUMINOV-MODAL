class AwesomeModal {
  constructor({ titleText, messageText, confirmText, cancelText }) {
    this.titleText = titleText;
    this.messageText = messageText;
    this.confirmText = confirmText;
    this.cancelText = cancelText;
  }
  createAndOpen(onConfirm, onCancel) {
    this.modalElem = document.createElement("div");
    this.modalElem.classList.add("modal");

    setTimeout(() => {
      this.modalElem.classList.add("open");
    }, 400);

    const modalContentElem = document.createElement("div");
    modalContentElem.classList.add("content");
    this.modalElem.appendChild(modalContentElem);
    // HEADING
    const titleTextElem = document.createElement("p");
    titleTextElem.classList.add("titleText");
    titleTextElem.textContent = this.titleText;

    modalContentElem.appendChild(titleTextElem);
    //  MESSAGE
    const messageTextElem = document.createElement("p");
    messageTextElem.classList.add("messageText");
    messageTextElem.textContent = this.messageText;

    modalContentElem.appendChild(messageTextElem);
    //  BUTTONS
    const cancelButtonTextElem = document.createElement("button");
    cancelButtonTextElem.classList.add("cancelButtonText");
    cancelButtonTextElem.textContent = this.cancelText;

    cancelButtonTextElem.addEventListener("click", () => {
      onCancel("Cancelled");
      this.close();
    });

    modalContentElem.appendChild(cancelButtonTextElem);
    //   CONFIRM
    const confirmButtonTextElem = document.createElement("button");
    confirmButtonTextElem.classList.add("confirmButtonText");
    confirmButtonTextElem.textContent = this.confirmText;

    confirmButtonTextElem.addEventListener("click", () => {
      onConfirm("Succes");
      this.close();
    });

    modalContentElem.appendChild(confirmButtonTextElem);

    document.body.appendChild(this.modalElem);
  }

  open() {
    return new Promise((resolve, reject) => {
      this.createAndOpen(resolve, reject);
    });
  }

  close() {
    this.modalElem.classList.remove("open");
    setTimeout(() => {
      document.body.removeChild(this.modalElem);
    }, 400);
  }
}
const confirmModal = new AwesomeModal({
  titleText: "Are you sure?",
  messageText: "This action cannot be undone",
  confirmText: "Absolutely!",
  cancelText: "No",
});
console.log(confirmModal);
const openModal = document.getElementById("openModal");
openModal.addEventListener("click", () => {
  confirmModal
    .open()
    .then((value) => console.log("User clicked confirm", value))
    .catch((value) => console.log("User clicked cancel", value));
});
