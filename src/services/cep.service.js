export const getEnderecoPorCEP = async (cep) => {
  const url = `https://republicavirtual.com.br/web_cep.php?cep=${cep}&formato=jsonp`;
  let status = 0;
  return fetch(url)
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error;
    });
};
