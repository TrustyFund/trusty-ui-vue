// U know the deal
export const ORDER_NEW = 1;

// There is no enough funds on bitshares buffer(taking in account locked some)
export const ORDER_UNRELIZABLE = 2;

// There was no operators who can/want to take order
export const ORDER_REJECTED = 3;

// Operator took order
export const ORDER_ACCEPTED = 4;

// Operator dropped order after accepting it but before requisites was sent to client.
export const ORDER_DROPPED = 5;

// Related lb contact found
export const ORDER_LINKED = 6;

// Waiting for payment from client
export const ORDER_PAYMENT = 7;

// Canceled by client
export const ORDER_CANCELED = 8;

// Client did not fund lb contract in time
export const ORDER_TIMEOUT = 9;

// Waiting for confirmation from operator or lb
export const ORDER_CONFIRMATION = 10;

// Transferring bitshares
export const ORDER_TRANSFER = 11;

// Finished
export const ORDER_FINISHED = 12;
