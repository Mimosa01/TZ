import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type OfferState = {
  /** Пока true — показываем цену со скидкой; после окончания таймера — только полную цену */
  promoActive: boolean;
  /** Уникальный ключ тарифа из API (`period` уникален в списке) */
  selectedTariffKey: string | null;
};

const initialState: OfferState = {
  promoActive: true,
  selectedTariffKey: null,
};

export const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    endPromo(state) {
      state.promoActive = false;
    },
    selectTariff(state, action: PayloadAction<string | null>) {
      state.selectedTariffKey = action.payload;
    },
  },
});

export const { endPromo, selectTariff } = offerSlice.actions;
