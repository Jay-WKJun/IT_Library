// 코드를 그냥 되는대로 짜보자.

// 극장에 공연이 있는데, 그곳에 사람들이 참여할 수 있도록 만드는 코드이다.

// 초대장, 언제인지 날짜가 들어있어야한다.
class Invitation1 {
  private when: Date;
}

// 티켓에는 가격이 있어야한다.
class Ticket1 {
  private fee: number;

  getFee() {
    return this.fee;
  }
}

// 사람들의 소지품을 넣는 가방이다.
// 영화 관람을 위한 돈과 초대장, 티켓이 들어갈 수 있다.
class Bag1 {
  constructor(amount: number) {
    this.amount = amount;
  }

  private amount: number;
  private invitation: Invitation1;
  private ticket: Ticket1;

  getAmount() {
    return this.amount;
  }

  getInvitation() {
    return this.invitation;
  }

  setTicket(ticket: Ticket1) {
    this.ticket = ticket;
  }

  minusAmount(amount: number) {
    this.amount -= amount;
  }

  plusAmount(amount: number) {
    this.amount += amount;
  }
}

// 관람객에 대한 객체
// 가방을 가지고 있다.
class Audience1 {
  private bag: Bag1;

  constructor(bag: Bag1) {
    this.bag = bag;
  }

  getBag(): Bag1 {
    return this.bag;
  }
}

// 티켓을 파는 사무실이다.
class TicketOffice1 {
  // 돈이다.
  amount: number;
  // 관람객에게 나눠줄 수 있는 티켓이 있어야한다.
  tickets: Ticket1[];

  constructor(amount: number, tickets: Ticket1[]) {
    this.amount = amount;
    this.tickets = tickets
  }

  getTicket() {
    return this.tickets.pop() as Ticket1;
  }

  minusAmount(amount: number) {
    this.amount -= amount;
  }

  plusAmount(amount: number) {
    this.amount += amount;
  }
}

// 티켓을 파는 판매원이다.
class TicketSeller1 {
  // 티켓 사무실을 알고 있어야 사무실과 소통할 수 있다.
  private ticketOffice: TicketOffice1;

  constructor(ticketOffice: TicketOffice1) {
    this.ticketOffice = ticketOffice;
  }

  getTicketOffice(): TicketOffice1 {
    return this.ticketOffice;
  }
}

// 극장에 대한 객체
class Theater1 {
  // 극장에 들어오는 사람들에게 티켓을 교환하기 위한 티켓 판매원을 알아야한다.
  ticketSeller: TicketSeller1;

  constructor(ticketSeller: TicketSeller1) {
    this.ticketSeller = ticketSeller;
  }

  // !!: 문제의 코드이다.
  // 극장이 모든 객체의 상세한 사항들을 헤짚는다.
  enter(audience: Audience1) {
    // 들어온 관람객의 가방을 가져온다.
    const bag = audience.getBag();
    if (bag.getInvitation()) {
      // 초대장이 있다면
      // 판매원은 새로운 티켓을 가져와서
      const newTicket = this.ticketSeller.getTicketOffice().getTicket();
      // 관객에게 전달한다.
      audience.getBag().setTicket(newTicket);
    } else {
      // 초대장이 없다면 티켓을 사야한다.
      // 우선 티켓의 정보를 티켓 판매원이 가져온다.
      const newTicket = this.ticketSeller.getTicketOffice().getTicket();
      // 티켓 가격만큼 관람객의 가방에서 뺀다.
      bag.minusAmount(newTicket.getFee());
      // 티켓 가격만큼 티켓 사무소에 더한다.
      this.ticketSeller.getTicketOffice().plusAmount(newTicket.getFee());
      // 새로운 티켓을 관람객의 가방에 넘겨준다.
      bag.setTicket(newTicket);
    }
  }
}
