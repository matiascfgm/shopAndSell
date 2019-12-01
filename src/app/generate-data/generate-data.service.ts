import {Product} from '../interfaces/product.interface';
import {CurrentUser} from '../core/services/current-user.service';
import {Config} from '../core/config';
import {FirestoreService} from '../core/services/firestore.service';

export class GenerateDataService {

  public firestoreService: FirestoreService;

  public userID = CurrentUser.user.uid;

  public userIds: string[] = [this.userID, 'OvEbNhiAp5guq8mFvnoXAMWyhmk2', 'lVVojhHGlDYsFoGd8HzJ2SLmqyw2', 'tz9NusxKfqXWyBNg4g0jxaVXeoF2'];

  public data: Partial<Product>[] = [
    this.tesla,
    this.tesla,
    this.tesla,
    this.tesla,
    this.phone,
    this.phone,
    this.phone,
    this.phone,
    this.phone,
    this.phone,
    this.phone,
    this.phone,
    this.phone,
    this.phone,
    this.phone,
  ];

  public constructor() {
  }

  public generate() {
    for (const product of this.data) {
      this.firestoreService.saveProduct(product as Product);
    }
  }


  private get tesla(): Product {
    return {
      title: 'Tesla Model ' + Math.floor(Math.random() * 10 + 1),
      description: 'The new tesla with strong windows',
      brand: 'Tesla',
      condition: this.used,
      uid: this.randomUser,
      price: Math.floor(Math.random() * 1000 * 5 + 10000),
      date: {
        seconds: this.randomDate
      },
      sold: false,
      image: {
        url: Config.NoImage,
        delete: null
      }
    } as Product;
  }

  private get phone(): Product {
    const iphoneUrls = [
      'https://images-na.ssl-images-amazon.com/images/I/51rxj5TepeL._AC_.jpg',
      'https://www.boostmobile.com/content/dam/boostmobile/en/products/phones/apple/iphone-7/silver/device-front.png.transform/pdpCarousel/image.jpg',
      'https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/apple-iphone-8/space-gray/apple-iphone8-space-gray-1-3x.jpg',
      'https://www.att.com/catalog/en/idse/Apple/Apple%20iPhone%2011/Purple-hero-zoom.png',
    ];
    return {
      title: 'iPhone model ' + Math.floor(Math.random() * 10 + 1),
      description: 'Expensive phone',
      brand: 'Apple',
      condition: this.used,
      uid: this.randomUser,
      price: Math.floor(Math.random() * 1000 * 5 + 10000),
      date: {
        seconds: this.randomDate
      },
      sold: false,
      image: {
        url: iphoneUrls[Math.floor(Math.random() * iphoneUrls.length)],
        delete: null
      }
    } as Product;
  }

  private get randomDate(): number {
    return Math.floor((+(new Date()) / 1000 - Math.floor(Math.random() * 100000000)));
  }

  private get randomUser(): string {
    return this.userIds[Math.floor(Math.random() * this.userIds.length)];
  }

  private get used(): any {
    const isUsed = (Math.random() > 0.7);

    const usedConditions = [
      'I don\'t like it',
      'Used only once',
      'Broken wrapping',
      'Stolen to fat kid',
      'Found on the river',
      'Bought it ' + (Math.floor(Math.random() * 1000)) + ' days ago',
      'Only used it for ' + (Math.floor(Math.random() * 100)) + ' hours',
    ];

    if (isUsed) {
      return {
        used: true,
        description: usedConditions[Math.floor(Math.random() * usedConditions.length)]
      };
    } else {
      return {
        used: false,
        description: ''
      };
    }
  }

}
