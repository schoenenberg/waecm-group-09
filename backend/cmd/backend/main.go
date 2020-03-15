package main

import (
	"context"
	"log"
	"net/http"
	"strings"

	"github.com/coreos/go-oidc"
)

const (
	clientID  = "waecm"
	issuerUrl = "https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm"
)

var (
	verifier *oidc.IDTokenVerifier
)

func main() {
	provider, err := oidc.NewProvider(context.Background(), issuerUrl)
	if err != nil {
		log.Fatalln(err)
	}
	verifier = provider.Verifier(&oidc.Config{ClientID: clientID})

	http.HandleFunc("/api/login", handleLogin)
	log.Fatalln(http.ListenAndServe(":8080", nil))
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	rawIdToken := r.Header.Get("Authorization")

	if trimmedToken := strings.TrimSpace(rawIdToken); trimmedToken == "" || trimmedToken == "Bearer" {
		http.Error(w, "Missing token.", http.StatusUnauthorized)
		return
	}

	_, err := verifier.Verify(r.Context(), rawIdToken)
	if err != nil {
		http.Error(w, "Invalid token.", http.StatusUnauthorized)
	} else {
		w.WriteHeader(http.StatusOK)
	}
}
