// 스스로 Movie의 절차지향적인 문제를 객체지향적으로 풀어본다.

// 극장이 너무나 구체적인 사실에 의존한다. 따라서 객체간의 결합도를 떨어뜨릴 필요가 있다.
// 그러려면 객체의 책임과 행동이 무엇인가에 대해 고민해야한다.

class Invitation {
  when: Date;
}

class Bag {
  amount: number;
  ticket: Ticket;
  invitation: Invitation;

  minusAmount(amount: number) {
    this.amount -= amount;
  }

  setTicket(ticket: Ticket) {
    this.ticket = ticket;
  }
}

// 극장의 역할은 관람객을 받아들이고 티켓 교환하는 것이다.
class Audience {
  // 관객은 온전히 자신의 가방을 자기 자신만 다룰 수 있다.
  private bag: Bag;

  getInvitation() {
    return this.bag.invitation;
  }

  getMoney(amount: number) {
    this.bag.minusAmount(amount);
    return amount;
  }

  setTicket(ticket: Ticket) {
    this.bag.setTicket(ticket);
  }
}

class Ticket {
  amount: number;
}

// 자신이 가진 티켓을 판매하는 역할을 한다.
class TicketOffice {
  // 티켓 사무소는 받은 만큼 돌려주는 티켓을 돌려주는 책임만 맞는다.
  amount: number;
  tickets: Ticket[];

  constructor(tickets: Ticket[]) {
    this.tickets = tickets;
  }

  getTicketPrice() {
    return this.tickets[0].amount
  }

  getTicket() {
    return this.tickets.pop() as Ticket;
  }

  sellTicket(amount: number) {
    this.amount -= amount;
    return this.getTicket();
  }
}

// 관람객에게서 돈이나 초대장을 받고, 티켓을 교환해준다.
class TicketSeller {
  ticketOffice: TicketOffice
  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  // TicketSeller는 Audience와 TicketOffice와의 public interface만 알면된다.
  // 그것으로 상호작용 로직을 만든다.
  // 여기서 각 객체를 자율적으로 만들어도, 결합도는 떨어지지 않는다. (객체는 모두 자율적이어야하지만, 그 원칙을 따르면 오히려 결합도가 오르는 경우도 있다.)
  // 하지만, TicketSeller의 책임이 무겁다.

  // 티켓 교환
  exchangeTicket(audience: Audience) {
    if (audience.getInvitation()) {
      // 오피스에서 티켓을 가져온다.
      const newTicket = this.ticketOffice.getTicket();
      // 관객은 전달받은 티켓을 알아서 셋팅한다.
      audience.setTicket(newTicket);
    } else {
      const ticketPrice = this.ticketOffice.getTicketPrice();
      const newTicket = this.ticketOffice.sellTicket(audience.getMoney(ticketPrice));
      audience.setTicket(newTicket);
    }
  }
}

class Theater {
  ticketSeller: TicketSeller;
  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  // 손님 입장.
  // 티켓
  enter(audience: Audience) {
    this.ticketSeller.exchangeTicket(audience);
  }
}
