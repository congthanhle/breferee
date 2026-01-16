import EndedIcon from '@/assets/icons/items/ended.png';

const Ended = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-base">
      <img src={EndedIcon} className="mb-6 w-32"/>
      <p className="font-semibold text-xl mb-4">Chương trình đã kết thúc</p>
      <p>TH true mart xin cảm ơn Quý khách đã tham gia chương trình <strong>&quot;Thật, Lành, Tự Nhiên - Đón Tết Yên Vui - Nhận hơn 54.000 quà tặng&quot;</strong>. Chương trình đã kết thúc vào ngày 28/02/2026.</p>
      <p className="mt-2">TH true mart cảm ơn Quý khách đã tin tưởng và đồng hành trong thời gian qua. Nếu Quý khách có bất kỳ thắc mắc hoặc cần hỗ trợ thêm, </p>
      <p>Vui lòng liên hệ tổng đài: <strong>1800 54 54 40 (phím 4).</strong></p>
    </div>
  );
};

export default Ended;