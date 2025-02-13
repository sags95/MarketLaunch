import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { OrderStore } from '~/state/order-store';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';

@injectable()
export class VendorActionMenuPresenter {
  constructor(@inject(Symbol.for(Injectables.OrderStore)) private orderStore: OrderStore) {
    makeAutoObservable(this);
  }

  get order() {
    return this.orderStore.order;
  }

  cancelOrder = () => {
    if (this.order) {
      this.orderStore.cancelOrder({ orderId: this.order.id! });
    }
  };

  get cancelError() {
    return this.orderStore.cancelError;
  }

  get isCancellingOrder() {
    return this.orderStore.isCancellingOrder;
  }

  resetCancelError = this.orderStore.resetCancelError;

  get fulfilOrderError() {
    return this.orderStore.fulfilOrderError;
  }

  get isFulfillingOrder() {
    return this.orderStore.isFulfillingOrder;
  }

  get orderFulfilledSuccess() {
    return this.orderStore.orderFulfilledSuccess;
  }

  resetFulfilOrderError = this.orderStore.resetFulfilOrderError;
  setOrderFulfilledSuccess = this.orderStore.setOrderFulfilledSuccess;
}

export const useVendorActionMenuPresenter = () =>
  useDependency<VendorActionMenuPresenter>(Symbol.for(Injectables.VendorActionMenuPresenter));
