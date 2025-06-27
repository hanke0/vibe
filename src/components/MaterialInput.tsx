import React, { useState } from 'react';
import { Plus, X, Link, Image, Film } from 'lucide-react';

interface MaterialInputProps {
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
}

const MaterialInput: React.FC<MaterialInputProps> = ({ urls, onUrlsChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return url.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null;
    } catch {
      return false;
    }
  };

  const addUrl = () => {
    if (inputValue.trim() && validateUrl(inputValue.trim())) {
      const newUrl = inputValue.trim();
      if (!urls.includes(newUrl)) {
        onUrlsChange([...urls, newUrl]);
      }
      setInputValue('');
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const removeUrl = (index: number) => {
    onUrlsChange(urls.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addUrl();
    }
  };

  const add1000MoviePosterUrls = () => {
    const moviePosterUrls = [
//       "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200muey9ha1749120066149/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200kcugfl21741835721320/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200zjezqda1750221218929/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020054hk5dd1744706300510/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200qd0wy4c1747731840726/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200jkr6xvc1749695033059/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200vdoh09g1734577308393/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200wo2gvli1742538800103/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200a1owucg1741748924826/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002002viesgi1746524765701/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200s8i07de1749094960961/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020071shwx01745741325880/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002002r057wc1740541300458/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ja05rc41740540955584/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200k98ayu01737515352562/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc002000r2t2ht1636528063363/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200rb8lmr41744684303315/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200fxjscgr1749526932050/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200fqgxzok1747659016137/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200xyp87bp1745062991416/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200vw6f1421743997941478/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200vw6f1421743997941478/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200kxy4ecm1748255853058/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ms48zl01734926379176/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/axfueld7dhfykbp1748335760215/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200uwc0flc1724815773448/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200pa18nf91738044757094/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200pa18nf91738044757094/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200bwaf1861738114704506/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200gtvxu1j1712892946706/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200umqq9ti1733800670338/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200gtvxu1j1712892946706/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002005f0j69w1740454242689/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002005f0j69w1740454242689/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002006a6qthq1733721799297/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200shxravh1737726102985/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002002ke63b21742288866224/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002002ke63b21742288866224/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002001ngr6pg1745299151665/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002004qtfhax1748598864940/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200fhd6k651732848663520/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020048bxzaf1744884635911/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002001ngr6pg1723693099958/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200mug4pbw1737647148997/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200vtyfo7a1740649423722/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200n6dmbxd1730959798303/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200vtyfo7a1739549268498/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002001zhoqyl1735543000238/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200vev03j71741093856306/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200dwcfd4w1731640475895/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200z0r4lxn1731922195798/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002009n5oau11731641300333/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200fo1al791739775232771/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020016rmn5f1729747777461/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002004yftlcj1741062179864/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002005lkvsro1736133256800/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200emht54d1747662057165/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002007sktduk1730795252456/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200urvv0p31742357749648/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020088jtn3y1738723345694/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200puojbq01737854677474/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200urvv0p31742357749648/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020019kvob41729570132022/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200nq0xz841733795410834/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200hct4dll1741848883256/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ppnqgin1717554727581/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ppnqgin1717554727581/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200i7wkc201727153915055/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200byybfyq1740042321910/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002000ccmjjg1738744251761/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ncr6ph41732189411360/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200d7326cv1726297075298/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ea9t1gl1726208330046/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200bner65e1725332399803/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200plzy02v1723084003898/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ea9t1gl1726208330046/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002005sit1yu1745748313110/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200glljezl1720766999394/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200hqf6ntv1735872281587/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200dq90j7t1743148966907/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002008ao2p1c1734597613874/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200wg3hvmf1716348894326/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200qraykcy1734334268830/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200rz2ryxy1732089297203/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002003ca7xsi1723090482781/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200qio4xf81730693770699/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002000nf90r31729849696547/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200dbwrqdo1729049768465/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200o4bhre31718938199173/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200z3yjqxm1719889909379/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/1aheg1fryzf8s3e1732609330297/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200f010yjx1735611595052/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200izjf89n1733799651400/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200izjf89n1733799651400/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200tec3z2s1721966465971/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200o44e7zg1737882193621/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002005ahczpu1727354921647/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020082cit5s1729750688351/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002007r3g2er1736478006175/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200c6971y11727843620620/0",
//       "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200to1ewi91721807642139/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/ym0vlqwsb7qtflgt1461760284.jpg/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200vn1vat41741244636937/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002004dw1xx21714456062607/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002004g2a9ch1725849016699/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200pedgs8v1732675212723/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200bivgbfj1742524562564/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020030n6qe91718777962868/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200bkz2yy11723187606793/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200vt73m8i1709880979169/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200gri954w1709892385052/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002005zhdsao1726815318555/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200het8sg71713145588564/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200doxywyx1716890258441/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002006pylr1e1721703867525/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020067stf4g1709894982352/0",
// "https://puui.qpic.cn/vcover_vt_pic/0/mzc00200nzhja1c1692152259114/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002005q5w4gv1713174413868/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200whsp9r61702687147368/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200n6zg7331742523259532/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200s3ovtv01747372076164/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200xnffs9s1713496185470/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200fg7uia51726648460327/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200hx7tw3i1726036243722/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200dnjvst41718965400168/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200sdeflum1747988078755/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200q52hjpy1715563276840/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200byf8iwb1716260885433/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200sbsjpzg1729047634816/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc00200fhhxx8d1681374664538/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200x2xo33l1749031408458/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200sp8p9xq1726296634514/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200w4u2xw51719476716823/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc002001svobq41678695942894/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200fb9fyl41715676771574/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200zg3eiqt1736393286046/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ga24l6n1715651393432/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200zl1t2fu1715736264669/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002003nl3als1723186965063/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002003zfdyow1747206121437/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200q6eydxu1742889287562/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200222avj31725244273965/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002002s2ark51711075515296/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ed03rku1741587567817/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200tgxq0et1723087920090/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200kg6q9wt1727579592182/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200xtrxg3m1713341557684/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200uck6bkx1728439961459/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200n49citl1749612494407/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002009t39grm1733364386774/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002009sp6cmt1721900627570/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200uwcujc11715651356255/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc00200fhhxx8d1681374664538/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ujar3jk1728888422824/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200n9v7eoq1715908725273/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ruzc2wf1734948949716/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200x0pe7pw1704260335933/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ivg534s1716340860241/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200dbpl4q01715330363790/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200if8tbww1715330355599/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc00200gzcn0mb1647844423233/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200m1q139e1712913728174/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200lxzxwzu1738999668464/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200sooctdh1715841709986/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ljdh0m41725328775079/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002001ynqc3f1746692611056/0",
// "https://puui.qpic.cn/vcover_vt_pic/0/mzc00200khwp1du1697698007005/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200q8e07jt1735203226740/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/x32xme8kp3cqsodt1444930077.jpg/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200911n0gm1715841752548/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc00200fx73ppl1667463255677/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200eso238h1725328698300/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200f65q2hn1716171058417/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc00200gzcn0mb1647844423233/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200yucsbyr1715676804570/0",
// "https://puui.qpic.cn/vcover_vt_pic/0/mzc0020043on5p41698804156215/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002006eoojij1717727123416/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200iw0ijo11729481686422/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200iyue5he1747984849742/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200o4aux4h1722418509081/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200wwqe1sp1715583593042/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200bs3qu2h1720775276926/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020090tu8q91724811324945/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc00200q7852jz1655731732938/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002003bz96wg1718624835710/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200o0qihk91728460445529/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200o0qihk91728460445529/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc00200gzcn0mb1647844423233/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200dtvdgny1725863969297/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc00200gzcn0mb1647844423233/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc0020025etjdy1734160935692/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200ca6cwl21708927070934/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200jlr3qg21721724276345/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc00200p2j2pe81599187490485/0",
// "https://puui.qpic.cn/vcover_vt_pic/0/mzc002006mm237j1698311389849/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200qjin3n81718589983709/0",
// "http://puui.qpic.cn/vcover_vt_pic/0/mzc00200eg2wzjt1584286853/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200z01c2xd1741599858376/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200nu782031725438172619/0",
// "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200nnnxmgw1741600005636/0",

      // 周星驰
      "https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc002002r057wc1740541300458/0",
"https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200f010yjx1735611595052/0",
"https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/fse52rd4klx7qn21711423360774/0",
"http://puui.qpic.cn/vcover_vt_pic/0/f0qjcexig8rjzpo1592384182153/0",
"http://puui.qpic.cn/vcover_vt_pic/0/uiq0rxuywu508qr1559138349/0",
"http://puui.qpic.cn/vcover_vt_pic/0/fwb4i1h9dq3rw7p1559756812/0",
"http://puui.qpic.cn/vcover_vt_pic/0/e3pdjwjjbbcmsow1567404888/0",
"http://puui.qpic.cn/vcover_vt_pic/0/wk8xgcdq0gdayni1481596980/0",
"http://puui.qpic.cn/vcover_vt_pic/0/4stn512j9gb51so1587883391703/0",
"http://puui.qpic.cn/vcover_vt_pic/0/777ghazyu5gty9r1567651679/0",
"https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/0psszmdu9yyngb41711423170372/0",
"https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/e5qmd3z5jr0uigk1711423326773/0",
"http://puui.qpic.cn/vcover_vt_pic/0/gwz8nqvc78oexgm1560168896/0",
"http://puui.qpic.cn/vcover_vt_pic/0/mxwqna0wtgezxzk1559829772/0",
"http://puui.qpic.cn/vcover_vt_pic/0/gu7ix7amihx0rve1567581648/0",
"http://puui.qpic.cn/vcover_vt_pic/0/6weiqj03dahkubl1524210353/0",
"http://puui.qpic.cn/vcover_vt_pic/0/4cm0r1h1hrrdw8z1608255364226/0",
"http://puui.qpic.cn/vcover_vt_pic/0/4neh6odn1uk1xtx1660037400650/0",
"http://puui.qpic.cn/vcover_vt_pic/0/d9f8pdars3tvve21572332944/0",
"http://puui.qpic.cn/vcover_vt_pic/0/c6f1skpmwxlpffq1608256422035/0",
"http://puui.qpic.cn/vcover_vt_pic/0/snq6ifkh840ghgq1568107106/0",
"http://puui.qpic.cn/vcover_vt_pic/0/pn5kxzhr7xucspl1577326622/0",
"http://puui.qpic.cn/vcover_vt_pic/0/6h9pfxvxtt31hw51615256281327/0",
"http://puui.qpic.cn/vcover_vt_pic/0/oea7yfgmin3mqtf1608257996689/0",
"http://puui.qpic.cn/vcover_vt_pic/0/7k5kw6clg0o2gqqt1444753101.jpg/0",
"http://puui.qpic.cn/vcover_vt_pic/0/4kzwzhufu1bc6vf1542192548/0",
"http://puui.qpic.cn/vcover_vt_pic/0/tl4po5ctrlos7ib1482309539/0",
"http://puui.qpic.cn/vcover_vt_pic/0/chkrgbg6v6efk1y1493281337/0",
"http://puui.qpic.cn/vcover_vt_pic/0/mhho9x8az2wqs80t1453543232.jpg/0",
"http://puui.qpic.cn/vcover_vt_pic/0/s98tprsvaizkrkd1567675541/0",
"http://puui.qpic.cn/vcover_vt_pic/0/b77p0uwc0k7cbec1572313469/0",
"http://puui.qpic.cn/vcover_vt_pic/0/byrpz6qm8z79ugc1522662544/0",
"http://puui.qpic.cn/vcover_vt_pic/0/yz0z9mh7mebd5ld1567677045/0",
"http://puui.qpic.cn/vcover_vt_pic/0/ruaxux5p09vq5fp1523343991/0",
"http://puui.qpic.cn/vcover_vt_pic/0/ge3dcks01qsphk41560337527/0",
"http://puui.qpic.cn/vcover_vt_pic/0/g96tkknumacdcb81572332334/0",
"https://vcover-hz-pic.puui.qpic.cn/vcover_hz_pic/0/mzc002002r057wc1740540976266/0",
"https://vcover-hz-pic.puui.qpic.cn/vcover_hz_pic/0/mzc00200f010yjx1735611697579/0",
"http://puui.qpic.cn/vcover_hz_pic/0/fse52rd4klx7qn21566961089/0",
"http://puui.qpic.cn/vcover_hz_pic/0/f0qjcexig8rjzpo1592276092308/0",
"http://puui.qpic.cn/vcover_hz_pic/0/uiq0rxuywu508qr1480438739/0",
"http://puui.qpic.cn/vcover_hz_pic/0/fwb4i1h9dq3rw7p1658222049124/0",
"http://puui.qpic.cn/vcover_hz_pic/0/e3pdjwjjbbcmsow1559288569/0",
"http://puui.qpic.cn/vcover_hz_pic/0/wk8xgcdq0gdayni1591350513712/0",
"http://puui.qpic.cn/vcover_hz_pic/0/4stn512j9gb51so1587883535559/0",
"http://puui.qpic.cn/vcover_hz_pic/0/777ghazyu5gty9r1658220323874/0",
"http://puui.qpic.cn/vcover_hz_pic/0/0psszmdu9yyngb41658220977540/0",
"https://vcover-hz-pic.puui.qpic.cn/vcover_hz_pic/0/e5qmd3z5jr0uigk1747191714077/0",
"http://puui.qpic.cn/vcover_hz_pic/0/gwz8nqvc78oexgm1567394572/0",
"http://puui.qpic.cn/vcover_hz_pic/0/mxwqna0wtgezxzk1658220289959/0",
"http://puui.qpic.cn/vcover_hz_pic/0/gu7ix7amihx0rve1567581654/0",
"http://puui.qpic.cn/vcover_hz_pic/0/6weiqj03dahkubl1524210362/0",
"http://puui.qpic.cn/vcover_hz_pic/0/4cm0r1h1hrrdw8z1608255377345/0",
"http://puui.qpic.cn/vcover_hz_pic/0/4neh6odn1uk1xtxt1444736710.jpg/0",
"http://puui.qpic.cn/vcover_hz_pic/0/d9f8pdars3tvve21572333025/0",
"http://puui.qpic.cn/vcover_hz_pic/0/c6f1skpmwxlpffq1608256437109/0",
"http://puui.qpic.cn/vcover_hz_pic/0/snq6ifkh840ghgq1529487108/0",
"http://puui.qpic.cn/vcover_hz_pic/0/pn5kxzhr7xucspl1658127487637/0",
"http://puui.qpic.cn/vcover_hz_pic/0/6h9pfxvxtt31hw51615255760210/0",
"http://puui.qpic.cn/vcover_hz_pic/0/oea7yfgmin3mqtft1444750710.jpg/0",
"http://puui.qpic.cn/vcover_hz_pic/0/7k5kw6clg0o2gqq1564383610/0",
"http://puui.qpic.cn/vcover_hz_pic/0/4kzwzhufu1bc6vf1549003851/0",
"http://puui.qpic.cn/vcover_hz_pic/0/tl4po5ctrlos7ibt1450056632.jpg/0",
"http://puui.qpic.cn/vcover_hz_pic/0/chkrgbg6v6efk1yt1455762618.jpg/0",
"http://puui.qpic.cn/vcover_hz_pic/0/mhho9x8az2wqs801498199628/0",
"http://puui.qpic.cn/vcover_hz_pic/0/s98tprsvaizkrkd1657594450610/0",
"http://puui.qpic.cn/vcover_hz_pic/0/b77p0uwc0k7cbec1525404930/0",
"http://puui.qpic.cn/vcover_hz_pic/0/byrpz6qm8z79ugc1621416264194/0",
"http://puui.qpic.cn/vcover_hz_pic/0/yz0z9mh7mebd5ld1658131177072/0",
"http://puui.qpic.cn/vcover_hz_pic/0/ruaxux5p09vq5fp1658127780639/0",
"http://puui.qpic.cn/vcover_hz_pic/0/ge3dcks01qsphk41658130524026/0",
"http://puui.qpic.cn/vcover_hz_pic/0/g96tkknumacdcb81560167722/0",
    ];
    
    const newUrls = [...urls];
    moviePosterUrls.forEach(url => {
      if (!newUrls.includes(url)) {
        newUrls.push(url);
      }
    });
    onUrlsChange(newUrls);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Film className="w-5 h-5 text-green-400" />
        电影海报素材库
        <span className="text-sm text-gray-400 font-normal">({urls.length} / 1000 张)</span>
        {urls.length >= 1000 && (
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
            🎬 满载
          </span>
        )}
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="url"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsValid(true);
            }}
            onKeyPress={handleKeyPress}
            placeholder="输入图片URL (支持 jpg, png, gif, webp)"
            className={`flex-1 px-4 py-2 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
              isValid 
                ? 'border-gray-600 focus:ring-cyan-500 focus:border-cyan-500' 
                : 'border-red-500 focus:ring-red-500 focus:border-red-500'
            }`}
          />
          <button
            onClick={addUrl}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            添加
          </button>
        </div>
        
        {!isValid && (
          <p className="text-red-400 text-sm">请输入有效的图片URL</p>
        )}
        
        {urls.length === 0 && (
          <div className="text-center py-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Film className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-300 mb-2 text-lg font-medium">电影海报素材库</p>
            <p className="text-gray-400 mb-4 text-sm">还没有添加电影海报素材</p>
            <button
              onClick={add1000MoviePosterUrls}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 rounded-xl transition-all duration-200 text-white font-semibold shadow-lg shadow-purple-500/25 transform hover:scale-105"
            >
              🎬 添加电影海报
            </button>
            <p className="text-xs text-gray-500 mt-2">包含经典、科幻、恐怖、爱情等各类电影海报</p>
          </div>
        )}
        
        {urls.length > 0 && (
          <>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">
                  已加载 {urls.length} 张电影海报
                </span>
              </div>
            </div>
            
            <div className="max-h-32 overflow-y-auto space-y-2">
              {urls.slice(0, 10).map((url, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-700/50 rounded-lg group">
                  <Image className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="flex-1 text-sm text-gray-300 truncate">{url}</span>
                  <button
                    onClick={() => removeUrl(index)}
                    className="p-1 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {urls.length > 10 && (
                <div className="text-center py-2 text-xs text-gray-500">
                  ... 还有 {urls.length - 10} 张海报
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MaterialInput;