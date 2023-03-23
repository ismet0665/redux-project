import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // setUser: (state, {payload}) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = "";
    },
  },
});

export const { setUser, clearUser } = authSlice.actions; // authSlice içindeki actions lar değince authSlice daki func.ları export edebiliyoruz. özetle reducers içindeki func. authSlice.actions şeklinde export ediyoruz.
export default authSlice.reducer; //authSlice tamamınıda authSlice.reducer ile export ediyoruz. nerde kullanacagız store içerisinde kullanacagız.tek store olacak.

// slice = dilim
// initialState: initialState  key value aynı ise key yazmak yeterli yukarda tek yazdık.ES6
// normal redux ta type,reducer,action ayrı ayrı olusturmustuk.createSlice bunu tek bir dosya içerisinde type ,reducer, action creater ları yani dispatch i olusturuyoruz. createSlice bir obje barındırıyor. authSlice da obje.
// name: "auth" =>  name slice ın adını olusturuyor.//? name bizim type mız oluyor. type auth/setUser , auth/clearUser şeklinde oluşuyor. ayriyeten belirtmeye gerek yok.
// initialState =>  bu slice da bulunacak olan global state in başlangıc degerini belirtiyoruz.
// reducers => reducers key value su {} içindekiler.içinde de obje formatı var. func adı setUser key , values su ise : oluyor.
// reducers içerisinde bir fonk. yazıyoruz. func adı key : sonrası value oluyor. bu func. bizim action creater func. oluyor. diger redux ta todoAction klasöründe oldugu gibi.

// setUser func.(state,action) olarak 2 parametre alır.dispatch ile veri gönderiyoruz.
//ÖZET
// state i ayarlayacak 3 temel unsur var type,reducers, action lar.bu 3 ünü tek dosyada olusturmamızı saglayan createSlice methodu.reducers içerisinde state i güncelleyecek olan action func. yazıyoruz. typelarımızı name+func yani auth.setUser şeklinde type olusturuyor.
