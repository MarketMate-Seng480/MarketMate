import prisma from "./prisma";

const seedDatabase = async () => {
  // Delete all existing data
  await prisma.productCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.event.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.user.deleteMany();

  // Create shop categories
  const shopCategory1 = await prisma.shopCategory.create({
    data: {
      name: "Clothing & Accessories",
      description: "Find unique clothing, jewelry, and fashion accessories",
    },
  });

  const shopCategory2 = await prisma.shopCategory.create({
    data: {
      name: "Home & Decor",
      description: "Discover handcrafted furniture, pottery, and home decor items",
    },
  });

  const shopCategory3 = await prisma.shopCategory.create({
    data: {
      name: "Art & Collectibles",
      description: "Explore original paintings, sculptures, and unique collectibles",
    },
  });

  // Create product categories
  const productCategory2 = await prisma.productCategory.create({
    data: {
      name: "Jewelry",
      description: "Find handcrafted jewelry made from sustainable materials",
    },
  });

  const productCategory3 = await prisma.productCategory.create({
    data: {
      name: "Pottery",
      description: "Explore unique ceramic pieces made by local artisans",
    },
  });

  const productCategory4 = await prisma.productCategory.create({
    data: {
      name: "Furniture",
      description:
        "Discover handcrafted furniture made from reclaimed wood and sustainable materials",
    },
  });

  const productCategory5 = await prisma.productCategory.create({
    data: {
      name: "Paintings",
      description: "Explore original paintings in various styles and mediums",
    },
  });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: "info@wildwooddesigns.com",
      name: "Luca",
      password: "password", 
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: "info@eandemberjewelry.com",
      name: "Ember",
      password: "password", 
    }
  });

  const user3 = await prisma.user.create({
    data: {
      email: "info@sunstonepottery.com",
      name: "Penny",
      password: "password", 
    }
  });

  const user4 = await prisma.user.create({
    data: {
      email: "hello@artisanhubs.com",
      name: "Arthur",
      password: "password", 
    }
  });

  const user5 = await prisma.user.create({
    data: {
      email: "info@BobTest.com",
      name: "Bob Test",
      password: "password", 
    }
  });

  // Create vendors
  const vendor1 = await prisma.vendor.create({
    data: {
      name: "GoodLuca",
      description: "Creating unique and sustainable furniture pieces",
      email: "info@wildwooddesigns.com",
      phone: "(555) 555-5555",
      logo: "https://cdn.dribbble.com/userupload/12901068/file/original-473883d6952ea9b25c551b5b2ffe8e4b.png?resize=1024x768",
      userId: user1.id,
      shopTags: {
        connect: {
          id: shopCategory2.id,
        },
      },
    },
  });

  const vendor2 = await prisma.vendor.create({
    data: {
      name: "Earth & Ember Jewelry",
      description: "Handcrafted jewelry made from ethically sourced materials",
      email: "info@eandemberjewelry.com",
      phone: "(555) 555-5556",
      logo: "https://cdn.dribbble.com/userupload/13160300/file/original-12c28a8ed53c655335f31075a52754f0.png?resize=1024x576",
      userId: user2.id,
      shopTags: {
        connect: {
          id: shopCategory1.id,
        },
      },
    },
  });

  const vendor3 = await prisma.vendor.create({
    data: {
      name: "Penny's Pottery",
      description: "Beautiful and functional pottery pieces made with love",
      email: "info@sunstonepottery.com",
      phone: "(555) 555-5557",
      logo: "https://cdn.dribbble.com/userupload/6425484/file/original-bd5d30a21aba5b4ab7177948a02c7cab.jpg?resize=1504x1128",
      userId: user3.id,
      shopTags: {
        connect: {
          id: shopCategory2.id,
        },
      },
    },
  });

  const vendor4 = await prisma.vendor.create({
    data: {
      name: "Art.",
      description: "Original paintings and sculptures by local artists",
      email: "hello@artisanhubs.com",
      phone: "(555) 555-5558",
      logo: "https://cdn.dribbble.com/users/508142/screenshots/15533007/media/00c26f35f22d3c4c928650259e1acec1.jpg?resize=1600x1200&vertical=center",
      userId: user4.id,
      shopTags: {
        connect: {
          id: shopCategory3.id,
        },
      },
    },
  });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: "Reclaimed Wood Coffee Table",
      description: "A beautiful coffee table made from reclaimed wood",
      price: 350.0,
      stock: 5,
      featureImage:
        "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      detailImage: [
        "https://images.unsplash.com/photo-1581641363874-158d26798a62?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      vendor: {
        connect: {
          id: vendor1.id,
        },
      },
      categories: {
        connect: {
          id: productCategory4.id,
        },
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Silver Crescent Necklace",
      description: "A delicate necklace made from sterling silver",
      price: 75.0,
      stock: 10,
      featureImage:
        "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      detailImage: [
        "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1599459182681-c938b7f65af0?q=80&w=1589&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      vendor: {
        connect: {
          id: vendor2.id,
        },
      },
      categories: {
        connect: {
          id: productCategory2.id,
        },
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Handcrafted Ceramic Mug",
      description: "A beautiful and functional mug for your morning coffee",
      price: 25.0,
      stock: 1,
      featureImage:
        "https://images.unsplash.com/photo-1536936812504-0e77dc3f0b40?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      detailImage: [
        "https://images.unsplash.com/photo-1536936812504-0e77dc3f0b40?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      vendor: {
        connect: {
          id: vendor3.id,
        },
      },
      categories: {
        connect: {
          id: productCategory3.id,
        },
      },
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Abstract Acrylic Painting",
      description: "A vibrant and colorful abstract painting",
      price: 500.0,
      stock: 0,
      featureImage:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      detailImage: [
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      vendor: {
        connect: {
          id: vendor4.id,
        },
      },
      categories: {
        connect: {
          id: productCategory5.id,
        },
      },
    },
  });

  // Create events
  const event1 = await prisma.event.create({
    data: {
      name: "Artisan Market",
      description: "An outdoor market featuring local artisans and crafters",
      startDate: new Date("2024-06-01T10:00:00Z"),
      endDate: new Date("2024-06-03T16:00:00Z"),
      location: "Centennial Square, Victoria, BC",
      url: "https://www.artisanmarket.com",
      vendors: {
        connect: [
          {
            id: vendor1.id,
          },
          {
            id: vendor2.id,
          },
          {
            id: vendor3.id,
          },
          {
            id: vendor4.id,
          },
        ],
      },
      images: [
        "https://images.unsplash.com/photo-1629218091978-f70a20a43aab?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1629140877328-77e5a10019e1?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1629212191994-76eccd4aeb17?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
  });

  const event2 = await prisma.event.create({
    data: {
      name: "Craft Fair",
      description: "A community craft fair featuring local artisans and crafters",
      startDate: new Date("2024-07-01T10:00:00Z"),
      endDate: new Date("2024-07-03T16:00:00Z"),
      location: "Beacon Hill Park, Victoria, BC",
      url: "https://www.craftfair.com",
      vendors: {
        connect: [
          {
            id: vendor1.id,
          },
          {
            id: vendor2.id,
          },
          {
            id: vendor3.id,
          },
        ],
      },
      images: [
        "https://images.unsplash.com/photo-1617646160236-db27e21e4efe?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
  });

  const event3 = await prisma.event.create({
    data: {
      name: "Art Walk",
      description: "A self-guided tour of local art galleries and studios",
      startDate: new Date("2024-08-01T10:00:00Z"),
      endDate: new Date("2024-08-03T16:00:00Z"),
      location: "Various locations, Victoria, BC",
      url: "https://www.artwalk.com",
      vendors: {
        connect: [
          {
            id: vendor4.id,
          },
        ],
      },
      images: [
        "https://images.unsplash.com/photo-1565876427310-0695a4ff03b7?q=80&w=1693&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1661893375334-e2603ce341d7?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
  });

  return {
    shopCategory1,
    shopCategory2,
    shopCategory3,
    productCategory2,
    productCategory3,
    productCategory4,
    productCategory5,
    vendor1,
    vendor2,
    vendor3,
    vendor4,
    product1,
    product2,
    product3,
    product4,
    event1,
    event2,
    event3,
    user1,
    user2,
    user3,
    user4,
  };
};

// Execute the seedDatabase function
seedDatabase()
  .then((result) => console.log("Seed result:", result))
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
