import Swal from "sweetalert2";
export type SwalIcon = "success" | "error" | "warning" | "info" | "question";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("swal", Swal);
});

export const showAlert = async (
  title: string,
  icon: SwalIcon,
  denyButton: boolean
) => {
  const { $swal } = useNuxtApp();

  const alert = await $swal.fire({
    title,
    icon,
    confirmButtonText: denyButton ? "SIM" : "OK",
    denyButtonText: "NÃO",
    showDenyButton: denyButton,
    timer: denyButton ? undefined : 3000,
    background: "#111222",
  });

  return alert;
};
