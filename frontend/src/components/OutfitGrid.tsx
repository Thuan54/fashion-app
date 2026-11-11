import React from 'react';
import OutfitCard from './OutfitCard';

const OutfitGrid: React.FC = () => {
  const outfits = [
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlBx_NkDf36x_OoJ0BlexuKruv96DtQfgvoYyxLvL4Ao7bwRgVf7NlY2-E0Z4KVT3yOjpT5VJUQlYXBvhIw01tIMV8UuH6v0FDVZIE6Oo7wqByM85Hzf_ao_Gw4U0-edz2jDCStRRMVRk8FhLMk3y7Hd4OgmGQR9nbd3Ov_vgrpfxv_FXBH2CiB_6DqefsO_Mwc3479eNS6xEeZegXHBMzrm8WuVZiWLHGL9T_Mj8',
      category: 'Atelier Look',
      title: 'Look #01 • Weekend Stroll',
      description: 'Bản phối cuối tuần cùng sắc Baby Blue & Vàng Trắng. Blazer oversized dệt len hè kết hợp quần lụa tơ tằm dệt bóng tự nhiên.',
      likes: '148',
      inspires: '89',
      comments: '34',
      tags: ['#PastelFashion', 'Lụa Hà Đông'],
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO52_yJV2q0IG-kRXOFoh-3RFrddq2NbVOm0JiiIvd1yB-5k0IczvDmrv-Gg_ngzYsMEKRMs4DFFsT0s-EWML9ILnealQDK18AkoEbz0anzxs7ffjJMJyyfoeTZyd0mnrXqwJ4imsZTQ5WpKQevUrluoXx9RNdh3w2uEQyHGOKrf8TlojQhsvkS5H1WN_bxGWePbSrzarsbsBmWpyDP9AovIDquOyXxHO7n96806c',
      category: 'Dạ tiệc lụa tơ',
      title: 'Look #02 • Gala Moonlight',
      description: 'Đầm lụa dạ tiệc ánh trăng Moonlight Satin. Độ rủ hoàn hảo tôn vinh đường nét chuyển động tự nhiên.',
      likes: '420',
      inspires: '312',
      extraInfo: 'Đầm silk tơ tằm nguyên bản - Atelier Mai | Giày Mary Jane da bóng kem - Vintage Maison | Túi clutch xà cừ ngọc trai - Artisanal Pearl',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAylcJv1kKMvfvz0qPOwHtbnVK-ATZhB_FLeYs939U_JvTCsSTD0Xli1KcTAfNlxDg7Q4V224WQNK4J5GLbiic71--06NW15GZB3U0Dv_M9FSzvES5eXZfZWowVd7jANqodP9VAKwKeRgX4XyWYxpLVw2UbjSoK85JV8Hbx4CZXduWbaQxF9bfZVqpO9Hn9x7bTu4AC6Hwb6HAa5gOfxFBT094FzW05yvaJU7K5u0k',
      category: 'Cashmere Season',
      title: 'Look #03 • Rainy Reverie',
      description: 'Áo len đan lông cừu xanh pastel & Quần suông sợi dệt.',
      likes: '890',
      inspires: '190',
      extraInfo: '"Cảm giác ấm áp tựa mây trôi sớm mai."',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwojFDgBDTeZ_v_hk6fLglvJSM7Hz4wQXXeOjb8ri2i1qx3k1nFg8e2NVYHGAauE1YCetvqGc6ztLPIxz5xANqq2zdyWuFJwHQDcxJ9S3CZwXKqAOYN6oUo4Pb6BstkuT1LAkfOyhD6IRytQuPrr7kPYno4qXJJwjXOrHqGhMzHxYlEQFgv6zYwRsG_hssIDD9LySZuiPhPNqlsRHoiOuyvj9MEe8CxFjea_8YusA',
      category: 'Phụ kiện Capsule',
      title: 'Look #04 • Art & Craft',
      description: 'Khăn lụa tơ tằm vẽ tay & Phụ kiện Vintage.',
      likes: '542',
      inspires: '118',
      extraInfo: 'Dệt thủ công phiên bản giới hạn 10 chiếc.',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkX5RYHczCS0ISV9E7MxEjlAYivUEfTihtvrVfY-086i2L6zj61GaFge0rNHA_18XLKJ6fkgPPgYHS4b0ZXSkayXpHjyGujn6a0zv8c0uTB5e0ViiDOA9Fxbcc1PHH_qKVJQLubLs_foHdRuT8vGGDozU7CDNBu_VbIMIOoQa9FM6QCQe_z0J4F5-gq3XF5FtkDK8l0vA5iJTriAc9gNu3P7GYKoJVbMCMX7t7YqI',
      category: 'Office Couture Edit',
      title: 'Set phối hoàn chỉnh #05',
      description: 'Blazer đệm vai nhẹ cùng chân váy xếp ly ánh ngọc trai. Sự kết hợp giữa phom dáng công sở sắc nét và nét nữ tính thướt tha.',
      likes: '1.2k',
      inspires: '450',
      tags: ['#PowerPastel', '#MinimalChic', 'Xu hướng Xuân \'25'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-subheading">Curated Looks & Styling Diptychs</h2>
          <p className="text-caption mt-1">86 bản phối lưu trữ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit, index) => (
          <OutfitCard key={index} {...outfit} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="btn-ghost px-8 py-3">
          Tải thêm bản phối lưu trữ (Còn 81 ý tưởng)
        </button>
      </div>
    </div>
  );
};

export default OutfitGrid;