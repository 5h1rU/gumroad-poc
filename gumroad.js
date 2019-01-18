class createHTMLContent {
  constructor() {
    this.container = null;
  }

  create() {
    this.container = document.createElement('div');
    return this;
  }

  injectContent(html) {
    this.container.innerHTML = html;
    this.container = this.container.querySelector('.product-main');
    return this;
  }

  print() {
    console.log(this.container);
    return this;
  }
}

class Product {
  async set(permalink) {
    try {
      const res = await fetch(`https://nodejs-bejbn9o2j.now.sh?permalink=${permalink}`, {
      'content-type': 'text/html',
      'charset': 'utf-8'
      });
      const text = await res.text();
      return text;
    } catch (error) {
      throw(error);
    }
  }

  async get(name) {
    const productHTML = await this.set(name);
    return productHTML;
  }
}

class Spinner {
  constructor() {
    this.spinner = document.createElement('div');
    this.spinner.innerHTML = 'Loading...';
    this.spinner.setAttribute('class', 'show-spinner');
    document.body.appendChild(this.spinner);
  }

  show() {
    this.spinner.style.display = 'block';
  }

  hide() {
    this.spinner.style.display = 'none';
  }
}

class DomManager {
  constructor() {
    this.container = document.createElement('div');
    this.container.setAttribute('class', 'product-container-modal');
    this.content = new createHTMLContent().create();
    this.spinner = null;
    return this;
  }

  init() {
    return this;
  }

  async changeProduct(name) {
    this.spinner = new Spinner();
    const product = await new Product().get(name);
    this.spinner.hide();
    document.body.appendChild(this.container);
    this.content.create().injectContent(product);
    this.container.childNodes[0]
      ? this.container.replaceChild(this.content.container, this.container.childNodes[0])
      : this.container.appendChild(this.content.container);
    return this.content;
  }

  destroy() {
    document.body.removeChild(this.container);
  }
}
