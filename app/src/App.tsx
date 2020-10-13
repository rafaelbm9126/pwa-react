import React from "react";
import { useLazyQuery, gql } from "@apollo/client";
import logo from "./logo.svg";
import initialData from "./default";

const EXCHANGE_RATES = gql`
  query SpotifyMusic($byName: String!) {
    queryArtists(byName: $byName) {
      id
      name
      image
      albums {
        id
        name
        image
      }
    }
  }
`;

interface BandInfoModel {
  id: string;
  name: string;
  image: string;
}

const BandInfo: React.FunctionComponent<BandInfoModel> = (props) => (
  <article className="media">
    <figure className="media-left">
      <p className="image is-64x64">
        <img src={props.image || logo} alt="band info" />
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <h1 style={{margin: "0"}}>{props.name}</h1>
        <span>{props.id}</span>
      </div>
    </div>
  </article>
);

interface AlbumsModel {
  id: string;
  name: string;
  image: string;
}

const Albums: React.FunctionComponent<AlbumsModel & { bandImg: string }> = (props) => (
  <div className="card" style={{width: 300, margin: "0 0 10px 0"}}>
    <div className="card-image">
      <figure className="image is-4by3">
        <img src={props.image || logo} alt="album" />
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src={props.bandImg} alt="band" />
          </figure>
        </div>
        <div className="media-content" style={{overflow: "hidden"}}>
          <p className="title is-4">{props.name}</p>
          <p className="subtitle" style={{fontSize: 12}}>{props.id}</p>
        </div>
      </div>
    </div>
  </div>
);

interface ResponseModel {
  queryArtists: Array<
    BandInfoModel & { albums: Array<AlbumsModel> }
  >;
}

export const App: React.FunctionComponent<{}> = () => {
  const [byName, setByName] = React.useState("");
  const [setFind, { loading, data }] = useLazyQuery<ResponseModel>(EXCHANGE_RATES);
  let inputRef: HTMLInputElement | null = null;

  React.useEffect(() => {
    // inital page
    setByName("Ghost");
  }, [setFind]);
  
  return (
    <div style={{margin: "0 10px 0 10px"}}>

      {
        loading && (
          <div className="modal" style={{display: "flex"}}>
            <div className="modal-background"></div>
            <div className="modal-content" style={{overflow: "hidden"}}>
              <img src={logo} className="App-logo" alt="loading" />
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
          </div>)
      }

      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              PWA with ReactJS
            </h1>
            <h2 className="subtitle">
              this a test :)
            </h2>
          </div>
        </div>
      </section>

      <div style={{ display: "flex", justifyContent: "center", width: "calc(100% - 20px)", margin: "10px" }}>
        <br />
        <div className="field has-addons">
          <div className="control">
            <input
              className="input" type="text"
              ref={(ref) => inputRef = ref}
              placeholder="Find a Band"
              value={byName}
              onChange={(e) => setByName(e.currentTarget.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setFind({ variables: { byName }});
                  inputRef?.blur();
                }
              }}
            />
          </div>
          <div className="control">
            <button
              className="button is-default"
              onClick={() => setByName("")}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {
        !loading && (data?.queryArtists || initialData.queryArtists).map((item, key) =>
          <div key={key}>
            <br />
            <BandInfo {...item} />
            <br />
            <div className="columns is-gapless is-multiline is-mobile is-centered">
              {
                item.albums.map((album, akey) =>
                  <div key={akey} className="column" style={{display: "flex", justifyContent: "center"}}>
                    <Albums {...album} bandImg={item.image || logo} />
                  </div>
                )
              }
            </div>
          </div>
        )
      }

      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>This is a PWA Example</strong> by <a href="https://github.com/RafaelBM91">rbm9126</a>.
          </p>
        </div>
      </footer>

    </div>
  );
};
