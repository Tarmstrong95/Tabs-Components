class Tab {
  constructor(tabEl, linkEl) {
    this.tabEl = tabEl;
    this.linkEl = linkEl;
    this.newTab = new TabLink(this.linkEl, this.tabEl);
    this.linkEl.addEventListener('click', () => this.deselect());
  }
  deselect(){
   this.newTab.deselect();
   this.newTab.select();
  }
}

class TabLink {
  constructor(element, tabEl) {
    // Assign this.element to the passed in DOM element
    this.element = element;
    this.tabEl = tabEl;

    // Get the custom data attribute on the Link
    this.data = this.element.dataset.tab;
    // Using the custom data attribute get the associated Item element
    this.itemElement = this.tabEl.querySelector( 
      `.tabs-item[data-tab = "${this.data}"]`
    );
    this.tabItem = new TabItem(this.itemElement, this.tabEl);
    this.element.addEventListener("click", () => {
      this.select()
    });
  }

  deselect() {
    const links = this.tabEl.querySelectorAll(".tabs-link");
    Array.from(links).forEach(x => {
      x.classList.remove("tabs-link-selected");
    });
    this.tabItem.deselect();
  }
  select() {
    // Add a class named "tabs-link-selected" to this link
    this.element.classList.add("tabs-link-selected");

    // Call the select method on the item associated with this link
    this.tabItem.select();
  }
}

class TabItem {
  constructor(element, tabEl) {
    // Assign this.element to the passed in element
    this.element = element;
    this.tabEl = tabEl;
  }
  deselect() {
    const items = this.tabEl.querySelectorAll(".tabs-item");
    Array.from(items).forEach(x => {
      x.classList.remove("tabs-item-selected");
    });
  }

  select() {
    // Add a class named "tabs-item-selected" to this element
    this.element.classList.add("tabs-item-selected");
  }
}

/* START HERE: 

- Select all classes named ".tabs-link" and assign that value to the links variable

- With your selection in place, now chain a .forEach() method onto the links variable to iterate over the DOM NodeList

- In your .forEach() method's callback function, return a new instance of TabLink and pass in each link as a parameter

*/
const tabs = document.querySelectorAll(".tabs");

tabs.forEach(tabEl => {
  const links = tabEl.querySelectorAll(".tabs-link");
  links.forEach(linkEl => {
    new Tab(tabEl, linkEl)
  });
});
