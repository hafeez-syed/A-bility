var modal        = document.querySelector('.focus-modal');
var modalButton  = document.querySelector('.focus-modal-button');
var modalOverlay = document.querySelector('.focus-modal-overlay');
var cancelButton = document.querySelector('.focus-modal-cancel');

modalButton.addEventListener('click', open);
cancelButton.addEventListener('click', close);

// Get a list of tabbable elements here:
// https://github.com/jkup/focusable

function open() {
    var previouslyFocused = document.activeElement;
    var focusableElements = modal.querySelector('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
    focusableElements = Array.prototype.slice.call(focusableElements);
    
    var firstItem = focusableElements[0];
    var lastItem = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', trap);
    
    // Show the modal and overlay
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
  
    function trap(event) {
        // TAB key;
        if (event.keyCode === 9) {
            // SHIFT key: go backwards
            if (event.shiftKey) {
                if(document.activeElement === firstItem) {
                    event.preventDefault();
                    lastItem.focus();
                }
            } else {
                if(document.activeElement === lastItem) {
                    event.preventDefault();
                    firstItem.focus();
                }
            }
        } else if (event.keyCode === 27) {
            close();
        }
    }
}

function close() {
    // Hide the modal and overlay
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
}
