const events = [
   {  
  
      name: "Edinburgh Outdoor Highland Tour",
      summary: "Come with us on our tour where we visit the beautiful highlands of Edinburgh, you will not regret it. A fun experience for all adults and teenagers. A great event that lets you see the beautiful landmarks of Edinburgh",

      description: {
        text: "Lorem ipsum text..." 
      },

      startsAt: "2023-05-12T14:00:00.817Z",
      endsAt: "2023-05-12T16:00:00.817Z",
      event_status: "pending",
      currency: "ETH",

      format: {
         id: 1,
         name: "Outdoor"
      },

      category: {
        id: 1,
        name: "Nature"
      },

      isOnline: false,
      maxCapacity: 20,
      minCapacity: 5,
      showRemaining: true,
      isPremium: true,

      ticketAvailability: {
        hasAvailableTickets: true
      },
    
      isLocked: true,
      isSoldOut: false,
      searchable: true,
      hideStartDate: false,
      hideEndDate: false,
      isFree: false,
      reservedSeating: true,

      eventSalesStatus: {
         salesStatus: "unavailable",
         salesStart: "2023-05-11T11:00:00.817Z",
         salesEnd: "2023-05-12T11:09:00.817Z"
      }

   },

   {

    name: "Three Sisters Drink n Socialise",
    summary: "Fancy a drink? Come to our Drink n Socialise event where you can meet new people, socialise and watch the football on our big screen. Adults and Teenagers welcome",

    description: {
      text: "Lorem ipsum text..." 
    },

    startsAt: "2022-12-01T18:00:00.817Z",
    endsAt: "2022-12-01T20:00:00.817Z",
    event_status: "pending",
    currency: "ETH",

    format: {
       id: "2",
       name: "Outdoor"
    },

    category: {
      id: 2,
      name: "Food/Drink"
    },

    isOnline: false,
    maxCapacity: 150,
    minCapacity: 10,
    showRemaining: true,
    isPremium: false,

    ticketAvailability: {
      hasAvailableTickets: true
    },
  
    isLocked: true,
    isSoldOut: false,
    searchable: true,
    hideStartDate: false,
    hideEndDate: false,
    isFree: false,
    reservedSeating: false,

    eventSalesStatus: {
       salesStatus: "unavailable",
       salesStart: "2023-11-30T15:00:00.817Z",
       salesEnd: "2023-11-30T11:22:00.817Z"
    }

 },

 {
    name: "Agile Project Management",
    summary: "Want to learn more about how to manage your software projects? Come to our event with your friends and family, or yourself if you are interested in building software projects using agile project management. We are waiting for you.",

    description: {
      text: "Lorem ipsum text..." 
    },

    startsAt: "2022-12-01T18:00:00.817Z",
    endsAt: "2022-12-01T20:00:00.817Z",
    event_status: "pending",
    currency: "ETH",

    format: {
       id: 2,
       name: "Outdoor"
    },

    category: {
      id: 2,
      name: "Food/Drink"
    },

    isOnline: false,
    maxCapacity: 300,
    minCapacity: 50,
    showRemaining: true,
    isPremium: false,

    ticketAvailability: {
      hasAvailableTickets: true
    },

    isLocked: true,
    isSoldOut: false,
    searchable: true,
    hideStartDate: false,
    hideEndDate: false,
    isFree: false,
    reservedSeating: false,

    eventSalesStatus: {
       salesStatus: "unavailable",
       salesStart: "2023-11-30T15:00:00.817Z",
       salesEnd: "2023-11-30T11:22:00.817Z"
    }
 }

]

module.exports = events;