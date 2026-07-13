import { db } from "../firebase/config";
import { getSettings, updateSettings } from "../firebase/db";

export function renderPengaturanPage() {
  return `
    <div style="max-width: 600px; margin: 0 auto; width: 100%;">
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 24px; border-bottom: 1px solid var(--surface-variant); padding-bottom: 12px;">Pengaturan Profil RT</h3>
        
        <form id="settings-form">
          <div class="form-group">
            <label class="form-label" for="set-nama-rt">Nama RT</label>
            <input type="text" id="set-nama-rt" class="form-control" required placeholder="Contoh: RT 03 / RW 02">
          </div>

          <div class="form-group">
            <label class="form-label" for="set-ketua">Nama Ketua RT</label>
            <input type="text" id="set-ketua" class="form-control" required placeholder="Nama lengkap Ketua RT">
          </div>

          <div class="form-group">
            <label class="form-label" for="set-alamat">Alamat / Wilayah RT</label>
            <textarea id="set-alamat" class="form-control" rows="3" required placeholder="Detail alamat wilayah RT"></textarea>
          </div>

          <div class="grid-2col-1-1" style="gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="set-rekening">Nomor Rekening Kas</label>
              <input type="text" id="set-rekening" class="form-control" placeholder="Contoh: Bank Mandiri 12345xxx">
            </div>
            <div class="form-group">
              <label class="form-label" for="set-kontak">Kontak Pengurus (HP)</label>
              <input type="text" id="set-kontak" class="form-control" placeholder="Nomor WA/Telepon">
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 24px; border-radius: var(--radius-md);">
            <i class="ri-save-line"></i> Simpan Pengaturan
          </button>
        </form>
      </div>
    </div>
  `;
}

export async function initPengaturanPage() {
  const form = document.getElementById("settings-form");

  // Load existing settings
  async function loadConfig() {
    Swal.fire({ title: 'Memuat...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
    try {
      const config = await getSettings();
      
      document.getElementById("set-nama-rt").value = config.nama_rt || "";
      document.getElementById("set-ketua").value = config.ketua || "";
      document.getElementById("set-alamat").value = config.alamat || "";
      document.getElementById("set-rekening").value = config.no_rekening || "";
      document.getElementById("set-kontak").value = config.kontak || "";
      
      Swal.close();
    } catch (e) {
      console.error(e);
      Swal.fire("Gagal", "Gagal memuat pengaturan profil RT.", "error");
    }
  }

  // Handle Submit Form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nama_rt = document.getElementById("set-nama-rt").value.trim();
    const ketua = document.getElementById("set-ketua").value.trim();
    const alamat = document.getElementById("set-alamat").value.trim();
    const no_rekening = document.getElementById("set-rekening").value.trim();
    const kontak = document.getElementById("set-kontak").value.trim();
 
    Swal.fire({ title: 'Menyimpan...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
 
    try {
      await updateSettings({
        nama_rt,
        ketua,
        alamat,
        no_rekening,
        kontak
      });
 
      Swal.fire("Berhasil", "Pengaturan profil RT berhasil diperbarui.", "success");
      loadConfig();
    } catch (err) {
      console.error(err);
      Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan pengaturan.", "error");
    }
  });

  await loadConfig();
}
